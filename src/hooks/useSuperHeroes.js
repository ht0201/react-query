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
