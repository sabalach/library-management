import {
  CheckOutlined,
  CloseCircleFilled,
  DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, LoadingOutlined, SearchOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Card, Input, message, Space, Select,
} from 'antd';
import { useRouter } from 'next/router';
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { Table } from 'ant-table-extensions';
import get from 'lodash/get';
import IdCardModal from '../components/IdCardModal';
import CurrentStudentContext from '../contexts/CurrentStudent';
import {
  DELETE_STUDENT, GET_DEPARTMENTS, GET_LEVELS, GET_STUDENTS,
} from '../queries';
import { appendSuffix } from '../utils';

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
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Contact',
    dataIndex: 'contactNumber',
    key: 'contactNumber',
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
              let feePaidMsg = '';
              const sem = get(record, 'feePaidUpto', 'unset');
              if (sem === 'unset') {
                feePaidMsg = 'Fee Not Updated';
              } else if (sem === 0) {
                feePaidMsg = 'Not paid';
              } else {
                feePaidMsg = `Paid upto ${appendSuffix(Number(sem))} semester`;
              }
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
                      {`${record.department.name}`}
                      <br />
                      {`${record.level.name}`}
                      <br />
                      {feePaidMsg}
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

const exportFields = {
  name: 'Name',
  serialNumber: 'Serial Number',
  gender: 'Gender',
  level: {
    header: 'Level',
    formatter: (_fieldValue) => _fieldValue.name,
  },
  department: {
    header: 'Department',
    formatter: (_fieldValue) => _fieldValue.name,
  },
  contactNumber: 'Contact',
  dob: 'Dob',
};

function AllStudent() {
  const [currentIdCard, setCurrentIdCard] = useState(null);
  const [currentLevelId, setCurrentLevelId] = useState();
  const [currentDepartmentId, setCurrentDepartmentId] = useState();
  const {
    data: { getStudents: students } = { getStudents: [] },
    loading,
    refetch,
  } = useQuery(GET_STUDENTS);

  useEffect(() => {
    refetch({
      // ...(currentLevelId ? { levelId: currentLevelId } : {}),
      // ...(currentDepartmentId ? { departmentId: currentDepartmentId } : {}),
      levelId: currentLevelId,
      departmentId: currentDepartmentId,
    });
  }, [currentLevelId, currentDepartmentId]);

  const data = useMemo(() => students.map(std => ({
    ...std,
    viewId: () => {
      setCurrentIdCard(std);
    },
  })), [students]);

  const {
    data: { getLevels: levels } = { getLevels: [] },
  } = useQuery(GET_LEVELS);

  const {
    data: { getDepartments: departments } = { getDepartments: [] },
  } = useQuery(GET_DEPARTMENTS);

  return (
    <>
      <Select
        showSearch
        style={{ width: 200, marginRight: '20px' }}
        placeholder="Filter by level"
        optionFilterProp="children"
        onChange={(v) => { setCurrentLevelId(v); }}
        onClear={() => setCurrentLevelId(null)}
        allowClear
        filterOption={
          (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {levels.map(level => <Option key={level.id} value={level.id}>{level.name}</Option>)}
      </Select>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Filter by department"
        optionFilterProp="children"
        onChange={(v) => { setCurrentDepartmentId(v); }}
        onClear={() => setCurrentDepartmentId(null)}
        allowClear
        filterOption={
          (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {departments.map(dpt => <Option key={dpt.id} value={dpt.id}>{dpt.name}</Option>)}
      </Select>
      <br />
      <br />
      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        size="middle"
        pagination={{ defaultPageSize: 8 }}
        exportable
        exportableProps={{
          children: 'Export Data',
          btnProps: {
            type: 'primary',
            icon: <DownloadOutlined />,
            children: <span>Export to CSV</span>,
          },
          fields: exportFields,
          fileName: 'students',
        }}
      />
      <IdCardModal currentIdCard={currentIdCard} setCurrentIdCard={setCurrentIdCard} />
    </>
  );
}

export default AllStudent;
