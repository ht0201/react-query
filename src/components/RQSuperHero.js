import React from 'react';
import { useParams } from 'react-router-dom';
import { useSuperHero } from '../hooks/useSuperHero';

const RQSuperHero = () => {
  const { heroId } = useParams();

  const { isLoading, isFetching, isError, data, error } = useSuperHero(heroId);

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) return;

  return (
    <div>
      <h2>RQSuperHero detail</h2>
      <p>
        {data?.data.name} - {data?.data?.alterEgo}
      </p>
    </div>
  );
};

export default RQSuperHero;
