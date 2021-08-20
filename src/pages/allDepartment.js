import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Table } from 'antd';
import React from 'react';
import { DELETE_DEPARTMENT, GET_DEPARTMENTS } from '../queries';

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
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      const [deleteDpt, { loading }] = useMutation(DELETE_DEPARTMENT, {
        update(cache) {
          const existingDpt = cache.readQuery({ query: GET_DEPARTMENTS }).getDepartments;
          const newDpt = existingDpt.filter(dpt => dpt.id !== record.id);
          cache.writeQuery({
            query: GET_DEPARTMENTS,
            data: { getDepartments: newDpt },
          });
        },
      });
      return (
        <Button
          type="primary"
          shape="circle"
          icon={loading ? <LoadingOutlined /> : <DeleteOutlined />}
          danger
          onClick={async () => {
            if (loading) return;
            await deleteDpt({
              variables: { id: record.id },
            });
          }}
        />
      );
    },
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
