import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const fetchData = () => {
  console.log('call api');
  return axios.get('http://localhost:7000/superheroes');
};

const RQSuperHeroesPage = () => {
  const { isLoading, isError, data, error, isFetching, refetch } = useQuery(
    'superheroes',
    fetchData,
    {
      enabled: false,
    }
  );

  if (isLoading || isFetching) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>RQ Super Heroes</h2>
      <button onClick={refetch}>Fetch</button>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </div>
  );
};

export default RQSuperHeroesPage;
