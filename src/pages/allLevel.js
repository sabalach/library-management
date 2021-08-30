import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Table } from 'antd';
import React from 'react';
import { DELETE_LEVEL, GET_LEVELS } from '../queries';

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
    title: 'Valid Upto',
    dataIndex: 'validUpto',
    key: 'validUpto',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      const [deleteLevel, { loading }] = useMutation(DELETE_LEVEL, {
        update(cache) {
          const existingLevels = cache.readQuery({ query: GET_LEVELS }).getLevels;
          const newLevels = existingLevels.filter(lvl => lvl.id !== record.id);
          cache.writeQuery({
            query: GET_LEVELS,
            data: { getLevels: newLevels },
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
            await deleteLevel({
              variables: { id: record.id },
            });
          }}
        />
      );
    },
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
