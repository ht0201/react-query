import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { request } from '../utils/axios-utils';

const fetchData = () => {
  // return axios.get('http://localhost:7000/superheroes');
  return request({ url: '/superheroes' });
};

const addHero = (hero) => {
  return axios.post('http://localhost:7000/superheroes', hero);
};

export const useSuperHeroes = (onSuccess, onError) => {
  return useQuery('superheroes', fetchData, {
    // enabled: false,
    onSuccess,
    onError,
    // select: (heroes) => {
    //   return heroes?.data.map((hero) => hero);
    // },
  });
};

export const useAddHero = () => {
  // c1
  // return useMutation(addHero); // nhược điểm: post nhưng ko fetch lại list data

  //c2
  // POST: 201 , fetch: 200 => phải call 2 API
  // return useMutation(addHero, {
  //   onSuccess: (data) =>
  //   {
  //     queryClient.invalidateQueries('superheroes');
  //   }
  // }

  //c3 :  handling error
  // show UI list data (cũ + newData), POST 1 API => client và server sync
  // return useMutation(addHero, {
  //   onSuccess: (data) =>
  //   {
  //     queryClient.setQueryData('superheroes', (oldQueryData) =>
  //     {
  //       return {
  //         ...oldQueryData,
  //         data: [...oldQueryData.data, data.data],
  //       };
  //     });
  //   },
  // }

  // c4
  //useMutation :Optimistic Updates , POST 1 API, Fetch 1 API
  // 1. onMutate : cancel query useMutation, ghi lại previousData, setQueryData data mới = oldQueryData + newData
  // 2. onError : rollback về previousData
  // 3. onSettled: cập nhật query cho có data mới

  const queryClient = useQueryClient();
  return useMutation(addHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries('superheroes');
    //   queryClient.setQueryData('superheroes', (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('superheroes');

      const previousData = queryClient.getQueryData('superheroes');

      queryClient.setQueryData('superheroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData.data.length + 1, ...newHero },
          ],
        };
      });
      return { previousData };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('superheroes', context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('superheroes');
    },
  });
};
