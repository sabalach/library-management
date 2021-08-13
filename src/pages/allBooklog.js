import { RollbackOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Input, Space, Table,
} from 'antd';
import React, { useMemo } from 'react';
import {
  GET_BOOK_LOGS, GET_CONFIG, PAY_BOOK_FINE, RETURN_BOOK,
} from '../queries';

export const columns = [
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
    title: 'Book Serial No.',
    dataIndex: 'bookSerialNo',
    key: 'bookSerialNo',
    render: (b, record) => record.book.serialNumber,
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
    render: (date, record) => {
      const {
        data: { getConfig: config } = { getConfig: null },
      } = useQuery(GET_CONFIG);
      if (date) {
        if (record.paidFine && config) {
          const timeDiff = new Date().getTime() - new Date(record.borrowedDate).getTime();
          const daysDiff = timeDiff / (1000 * 3600 * 24);
          return `${Math.floor(daysDiff - config.fineAfter)} days late, ${(new Date(date)).toLocaleDateString()}`;
        }
        return (new Date(date)).toLocaleString();
      }
      return 'Not Returned';
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      const [returnBook, { loading }] = useMutation(RETURN_BOOK);
      const [payBookFine, { loading: loading2 }] = useMutation(PAY_BOOK_FINE);
      const {
        data: { getConfig: config } = { getConfig: null },
      } = useQuery(GET_CONFIG);
      const timeDiff = new Date().getTime() - new Date(record.borrowedDate).getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      const shouldFine = useMemo(() => {
        if (!config) {
          return null;
        }
        return daysDiff > config.fineAfter;
      }, [record, config]);
      return ([
        <Button
          type="primary"
          shape="round"
          danger
          loading={loading || loading2}
          disabled={!!(record.returnedDate || record.paidFine)}
          icon={<RollbackOutlined />}
          onClick={async () => {
            if (shouldFine) {
              await payBookFine({
                variables: {
                  bookLogId: record.id,
                },
              });
            } else {
              await returnBook({
                variables: {
                  bookSerialNumber: record.book.serialNumber,
                },
              });
            }
          }}
        >
          {shouldFine ? 'Pay Fine' : 'Return'}
        </Button>,
      ]);
    },
  },
];

function AllBooklog() {
  const {
    data: { getBookLogs: bookLogs } = { getBookLogs: null },
  } = useQuery(GET_BOOK_LOGS);
  return (
    <>
      <br />
      <Table
        dataSource={bookLogs}
        columns={columns}
        size="middle"
        pagination={{ defaultPageSize: 8 }}
      />
    </>
  );
}

export default AllBooklog;
