import React, { useState } from 'react';
import { useAddHero, useSuperHeroes } from '../hooks/useSuperHeroes';

import { Link } from 'react-router-dom';

const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching ', data);
  };

  const onError = (error) => {
    console.log('Perform side effect after encoutering error ', error);
  };

  const { isLoading, isError, data, error, isFetching, refetch } =
    useSuperHeroes(onSuccess, onError);

  const { mutate: addHero } = useAddHero();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const addHeroHandle = () => {
    const newHero = {
      name,
      alterEgo,
    };
    addHero(newHero);
  };

  let isInputEmpty = !name || !alterEgo ? true : false;

  return (
    <div>
      <h2>RQ Super Heroes</h2>
      <button onClick={refetch}>Fetch</button>
      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={addHeroHandle} disabled={isInputEmpty}>
          Add Hero
        </button>
      </div>

      {data?.data.map((hero) => {
        return (
          <Link to={`/rq-super-heroes/${hero.id}`} key={hero.id}>
            <p>{hero.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default RQSuperHeroesPage;
