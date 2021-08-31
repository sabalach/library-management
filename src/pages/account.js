import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import {
  Table, Input, Button, Space, Select,
  message,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { GET_STUDENTS, UPDATE_STUDENT } from '../queries';

const { Option } = Select;
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
          placeholder="Search Name"
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
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
    render: level => level.name,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    render: department => department.name,
  },
  {
    title: 'Fee',
    key: 'fee',
    render: (_fieldValue, record) => {
      const [updateStudent, { loading }] = useMutation(UPDATE_STUDENT);
      return (
        <Select
          placeholder="Select Semester"
          style={{ width: 120 }}
          onChange={async (v) => {
            message.loading({
              key: 'feepaid',
              content: 'Updating Fee',
            });
            await updateStudent({
              variables: {
                id: record.id,
                feePaidUpto: parseInt(v, 10),
              },
            });
            message.success({
              key: 'feepaid',
              content: 'Updated Fee Stats',
            });
          }}
          value={record.feePaidUpto ? String(record.feePaidUpto) : undefined}
          loading={loading}
        >
          <Option value="0">Unpaid</Option>
          <Option value="1">1st Sem</Option>
          <Option value="2">2nd Sem</Option>
          <Option value="3">3rd Sem</Option>
          <Option value="4">4th Sem</Option>
          <Option value="5">5th Sem</Option>
          <Option value="6">6th Sem</Option>
        </Select>
      );
    },
  },
];

function Account() {
  const {
    data: { getStudents: students } = { getStudents: [] },
  } = useQuery(GET_STUDENTS);
  return (
    <div>
      <Table dataSource={students} columns={columns} />
    </div>
  );
}

export default Account;
