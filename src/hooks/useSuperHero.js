import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { request } from '../utils/axios-utils';

const fetchDetails = ({ queryKey }) => {
  const [heroId] = queryKey[1];
  // return axios.get(`http://localhost:7000/superheroes/${heroId}`);
  return request({ url: `/superheroes/${heroId}` });
};

export const useSuperHero = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(['superhero', heroId], fetchDetails, {
    // select: (data) => {
    //   return data.data;
    // },
    initialData: () => {
      const hero = queryClient
        .getQueryData('superheroes')
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        console.log(hero);
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};
