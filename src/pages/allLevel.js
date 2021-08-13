import { useQuery } from '@apollo/client';
import { Table } from 'antd';
import React from 'react';
import { GET_LEVELS } from '../queries';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Abbreviation',
    dataIndex: 'abbreviation',
    key: 'abbreviation',
  },
];

function allLevel() {
  const {
    data: { getLevels: levels } = { levels: null },
  } = useQuery(GET_LEVELS);
  return (
    <>
      <br />
      <Table dataSource={levels} columns={columns} />
    </>
  );
}

export default allLevel;
