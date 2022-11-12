import React, { useState } from 'react';
import usePagination from '../hooks/usePagination';

const QueryPagination = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, isFetching, isError, data, error } =
    usePagination(pageNumber);

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
      <h2>QueryPagination</h2>

      {data?.data.map((color) => (
        <p>
          {color.id}. {color.label}
        </p>
      ))}

      <button
        onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        Previous
      </button>

      <button
        onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
        disabled={pageNumber === 4}
      >
        Next
      </button>

      {isFetching && <p>Loading page...</p>}
    </div>
  );
};

export default QueryPagination;
