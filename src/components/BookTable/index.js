import {
  BookOutlined,
  DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined,
} from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import {
  Button, Input, message, Space, Table,
} from 'antd';
import { useRouter } from 'next/router';
import React, { useContext, useMemo, useState } from 'react';
import CurrentStudentContext from '../../contexts/CurrentStudent';
import {
  BORROW_BOOK, DELETE_BOOK, GET_BOOKS, GET_BOOK_LOGS,
} from '../../queries';
import BookBarcodeModal from '../BookBarcodeModal';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
    onFilter: (value, record) => (record.name
      ? record.name.toString().toLowerCase().includes(value.toLowerCase())
      : ''),
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'ISBN',
    dataIndex: 'isbn',
    key: 'isbn',
  },
  {
    title: 'Condition',
    dataIndex: 'condition',
    key: 'condition',
  },
  {
    title: 'Serial Number',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search Serial Number"
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
    onFilter: (value, record) => (record.serialNumber
      ? record.serialNumber.toLowerCase().includes(value.toLowerCase())
      : ''),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      const router = useRouter();
      const { currentStudent, setCurrentStudent } = useContext(CurrentStudentContext);
      const [deleteStudent, { loading }] = useMutation(DELETE_BOOK, {
        update(cache) {
          const existingBooks = cache.readQuery({ query: GET_BOOKS }).getBooks;
          const newBooks = existingBooks.filter(std => std.id !== record.id);
          cache.writeQuery({
            query: GET_BOOKS,
            data: { getBooks: newBooks },
          });
        },
      });
      const [borrowBook] = useMutation(BORROW_BOOK, {
        refetchQueries: [{ query: GET_BOOK_LOGS }],
      });
      return (
        <Space size="small" key={record.id}>
          <Button
            type="primary"
            shape="circle"
            style={{ borderWidth: '0px', backgroundColor: '#FF6F00', color: '#fff' }}
            icon={<EyeOutlined />}
            onClick={() => {
              record.viewBarCode();
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              router.push({
                pathname: '/editBook',
                query: {
                  id: record.id,
                },
              });
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            loading={loading}
            danger
            onClick={async () => {
              if (loading) return;
              await deleteStudent({
                variables: { id: record.id },
              });
            }}
          />
          <Button
            type="text"
            shape="round"
            style={{ backgroundColor: '#43A047', color: '#fff' }}
            icon={<BookOutlined />}
            onClick={async () => {
              if (!currentStudent.current) {
                message.error('Please select student first');
                return;
              }
              try {
                await borrowBook({
                  variables: {
                    bookSerialNumber: record.serialNumber,
                    studentSerialNumber: currentStudent.current.serialNumber,
                  },
                });
                message.success('Sucessfully Borrowed');
                message.destroy('currentStudent');
                setCurrentStudent(null);
              } catch (error) {
                message.error(error.message);
              }
            }}
          >
            Borrow
          </Button>
        </Space>
      );
    },
  },
];

function BookTable({ data = [] }) {
  const [currentBookBarcode, setCurrentBookBarcode] = useState();
  const books = useMemo(() => (Array.isArray(data) ? data.map(book => ({
    ...book,
    viewBarCode: () => {
      setCurrentBookBarcode(book);
    },
  })) : []), [data]);

  return (
    <>
      <Table
        dataSource={books}
        columns={columns}
      />
      <BookBarcodeModal
        currentBookBarcode={currentBookBarcode}
        setCurrentBookBarcode={setCurrentBookBarcode}
      />
    </>
  );
}

export default BookTable;
