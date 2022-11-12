import axios from 'axios';
import React from 'react';
import { useQueries } from 'react-query';

const fetchData = (heroId) => {
  return axios.get(`http://localhost:7000/superheroes/${heroId}`);
};

// use: fetch song song cùng 1 lúc cái API

const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchData(id),
      };
    })
  );

  console.log(queryResults);

  return <div>DynamicParallelPage</div>;
};

export default DynamicParallelPage;
