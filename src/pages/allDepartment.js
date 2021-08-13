import { useQuery } from '@apollo/client';
import { Table } from 'antd';
import React from 'react';
import { GET_DEPARTMENTS } from '../queries';

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

function allDepartment() {
  const {
    data: { getDepartments: departments } = { departments: null },
  } = useQuery(GET_DEPARTMENTS);
  return (
    <>
      <br />
      <Table dataSource={departments} columns={columns} />
    </>
  );
}

export default allDepartment;
