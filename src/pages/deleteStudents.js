import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
  Card, Select, Form, Button, Modal, message,
} from 'antd';
import React, { useState } from 'react';
import { DELETE_STUDENTS, GET_DEPARTMENTS, GET_LEVELS } from '../queries';

const { Option } = Select;

function DeleteStudents() {
  const [selectedFilter, setSelectedFilter] = useState();
  const {
    data: { getLevels: levels } = { levels: null },
  } = useQuery(GET_LEVELS);
  const {
    data: { getDepartments: departments } = { departments: null },
  } = useQuery(GET_DEPARTMENTS);
  const [deleteStudents] = useMutation(DELETE_STUDENTS);
  return (
    <Card>
      Delete Students By:
      {'   '}
      <Select
        placeholder="Select an option"
        onChange={(v) => {
          setSelectedFilter(v);
        }}
        allowClear
        style={{ minWidth: '130px' }}
      >
        <Option value="department">Department</Option>
        <Option value="level">Level</Option>
      </Select>
      <br />
      <br />
      {selectedFilter === 'level' && (
      <Form
        onFinish={async (values) => {
          Modal.confirm({
            title: 'Are you sure you want to delete all these students?',
            icon: <ExclamationCircleOutlined />,
            content: 'Multiple students will be deleted',
            async onOk() {
              message.loading({
                key: 'deletestudents',
                content: 'Loading',
              });
              await deleteStudents({
                variables: {
                  levelId: values.levelId,
                },
              });
              message.success({
                key: 'deletestudents',
                content: 'Sucessfully Deleted Students',
              });
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }}
        style={{ maxWidth: '300px' }}
      >
        <Form.Item label="Level" name="levelId">
          <Select
            style={{ minWidth: '130px' }}
          >
            {levels.map(lvl => <Option key={lvl.id} value={lvl.id}>{lvl.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      )}
      {selectedFilter === 'department' && (
      <Form
        onFinish={async (values) => {
          Modal.confirm({
            title: 'Are you sure you want to delete all these students?',
            icon: <ExclamationCircleOutlined />,
            content: 'Multiple students will be deleted',
            async onOk() {
              message.loading({
                key: 'deletestudents',
                content: 'Loading',
              });
              await deleteStudents({
                variables: {
                  departmentId: values.departmentId,
                },
              });
              message.success({
                key: 'deletestudents',
                content: 'Sucessfully Deleted Students',
              });
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }}
        style={{ maxWidth: '300px' }}
      >
        <Form.Item label="Department" name="departmentId">
          <Select
            style={{ minWidth: '130px' }}
          >
            {departments.map(dpt => <Option key={dpt.id} value={dpt.id}>{dpt.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      )}
    </Card>
  );
}

export default DeleteStudents;
