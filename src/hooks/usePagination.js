import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const fetchDataPagination = (pageNumber) => {
  return axios.get(`http://localhost:7000/colors?_limit=2&_page=${pageNumber}`);
};

const usePagination = (pageNumber) => {
  return useQuery(
    ['colors', pageNumber],
    () => fetchDataPagination(pageNumber),
    {
      keepPreviousData: true,
    }
  );
};

export default usePagination;
