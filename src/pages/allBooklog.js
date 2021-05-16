import { RollbackOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Input, Space, Table,
} from 'antd';
import React from 'react';
import SiteLayout from '../components/SiteLayout';
import { GET_BOOK_LOGS, RETURN_BOOK } from '../queries';

const columns = [
  {
    title: 'Book',
    dataIndex: 'book',
    key: 'book',
    render: book => book.name,
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search Book Name"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => (record.book.name
      ? record.book.name.toString().toLowerCase().includes(value.toLowerCase())
      : ''),
  },
  {
    title: 'Student',
    dataIndex: 'student',
    key: 'student',
    render: student => student.name,
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search Student Name"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => (record.student.name
      ? record.student.name.toString().toLowerCase().includes(value.toLowerCase())
      : ''),
  },
  {
    title: 'Borrowed',
    dataIndex: 'borrowedDate',
    key: 'borrowedDate',
    render: date => (new Date(date)).toLocaleString(),
  },
  {
    title: 'Returned',
    dataIndex: 'returnedDate',
    key: 'returnedDate',
    render: date => (date ? (new Date(date)).toLocaleString() : 'Not Returned'),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      const [returnBook, { loading }] = useMutation(RETURN_BOOK);
      return (
        <Button
          type="primary"
          shape="round"
          danger
          loading={loading}
          disabled={!!(record.returnedDate)}
          icon={<RollbackOutlined />}
          onClick={async () => {
            await returnBook({
              variables: {
                bookSerialNumber: record.book.serialNumber,
              },
            });
          }}
        >
          Return
        </Button>
      );
    },
  },
];

function AllBooklog() {
  const {
    data: { getBookLogs: bookLogs } = { getBookLogs: null },
  } = useQuery(GET_BOOK_LOGS);
  return (
    <SiteLayout selectedKeys={['booklog', 'allBooklog']} subTitle="All Book Logs">
      <br />
      <Table
        dataSource={bookLogs}
        columns={columns}
        size="middle"
        pagination={{ defaultPageSize: 8 }}
      />
    </SiteLayout>
  );
}

export default AllBooklog;
