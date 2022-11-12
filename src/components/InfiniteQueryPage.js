import axios from 'axios';
import React, { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:7000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueryPage = () => {
  const {
    isLoading,
    isFetching,
    isError,
    data,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  console.log({ isLoading, isFetching, isFetchingNextPage });

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) return;

  return (
    <div>
      <h2>InfiniteQueryPage</h2>

      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((color) => (
            <p key={color.id}>
              {color.id}. {color.label}
            </p>
          ))}
        </Fragment>
      ))}

      {hasNextPage && <button onClick={fetchNextPage}>Load more</button>}

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
};

export default InfiniteQueryPage;
