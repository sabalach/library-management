import {
  CheckOutlined,
  CloseCircleFilled,
  DeleteOutlined, EditOutlined, EyeOutlined, LoadingOutlined, SearchOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Card, Input, message, Space, Table,
} from 'antd';
import { useRouter } from 'next/router';
import React, { useContext, useMemo, useState } from 'react';
import IdCardModal from '../components/IdCardModal';
import CurrentStudentContext from '../contexts/CurrentStudent';
import { DELETE_STUDENT, GET_STUDENTS } from '../queries';

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
    render: (serialNum, record) => `${record.level.abbreviation}${record.department.abbreviation}${serialNum}`,
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
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'DOB',
    dataIndex: 'dob',
    key: 'dob',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      const router = useRouter();
      const { setCurrentStudent } = useContext(CurrentStudentContext);
      const [deleteStudent, { loading }] = useMutation(DELETE_STUDENT, {
        update(cache) {
          const existingStudents = cache.readQuery({ query: GET_STUDENTS }).getStudents;
          const newStudents = existingStudents.filter(std => std.id !== record.id);
          cache.writeQuery({
            query: GET_STUDENTS,
            data: { getStudents: newStudents },
          });
        },
      });
      return (
        <Space size="small" key={record.id}>
          <Button
            type="primary"
            shape="circle"
            style={{ borderWidth: '0px', backgroundColor: '#FF6F00', color: '#fff' }}
            icon={<EyeOutlined />}
            onClick={() => {
              record.viewId();
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              router.push({
                pathname: '/editStudent',
                query: {
                  id: record.id,
                },
              });
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={loading ? <LoadingOutlined /> : <DeleteOutlined />}
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
            shape="circle"
            style={{ backgroundColor: '#43A047', color: '#fff' }}
            icon={<CheckOutlined />}
            onClick={() => {
              setCurrentStudent(record);
              message.info({
                icon: <div />,
                content: (
                  <Card
                    title="Selected Student"
                    bordered={false}
                    style={{
                      width: 250, textAlign: 'left', margin: 0, padding: 0,
                    }}
                    extra={(
                      <Button
                        type="text"
                        style={{
                          margin: 0,
                          padding: 0,
                        }}
                        onClick={() => {
                          setCurrentStudent(null);
                          message.destroy('currentStudent');
                        }}
                      >
                        <CloseCircleFilled style={{ fontSize: '18px', color: '#ff4d4f' }} />
                      </Button>
                    )}
                    bodyStyle={{
                      margin: 0,
                      padding: 0,
                      paddingTop: '5px',
                    }}
                    headStyle={{
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <div>
                      {`${record.name}`}
                      <br />
                      {`Grade ${record.grade}`}
                      <br />
                    </div>
                  </Card>
                ),
                key: 'currentStudent',
                duration: 0,
                onClose: () => {
                  setCurrentStudent(null);
                },
              });
            }}
          />
        </Space>
      );
    },
  },
];

function AllStudent() {
  const [currentIdCard, setCurrentIdCard] = useState(null);
  const {
    data: { getStudents: students } = { getStudents: [] },
  } = useQuery(GET_STUDENTS);

  const data = useMemo(() => students.map(std => ({
    ...std,
    viewId: () => {
      setCurrentIdCard(std);
    },
  })), [students]);

  return (
    <>
      <br />
      <Table
        dataSource={data}
        columns={columns}
        size="middle"
        pagination={{ defaultPageSize: 8 }}
      />
      <IdCardModal currentIdCard={currentIdCard} setCurrentIdCard={setCurrentIdCard} />
    </>
  );
}

export default AllStudent;
