import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchUser = (email) => {
  return axios.get(`http://localhost:7000/users/${email}`);
};

const fetchChannel = (channelId) => {
  return axios.get(`http://localhost:7000/channels/${channelId}`);
};

// use: chờ data từ API 1 truyền cho API 2 mới fetch

const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['users', email], () => fetchUser(email));

  const channelId = user?.data.channelId;

  const { data: courses } = useQuery(
    ['channels', channelId],
    () => fetchChannel(channelId),
    {
      enabled: !!channelId, // chờ có channelId từ user rồi mới fetch
    }
  );

  return (
    <div>
      <h2>DependentQueriesPage</h2>
      {courses?.data.courses.map((course) => (
        <p>{course}</p>
      ))}
    </div>
  );
};

export default DependentQueriesPage;
