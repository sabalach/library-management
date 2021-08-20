/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Form, Input, Button, Card, Select,
} from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';

import {
  ADD_STUDENT, GET_DEPARTMENTS, GET_LEVELS, GET_STUDENTS,
} from '../queries';
import ImageUpload from '../components/ImgUpload';

const { Option } = Select;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

function AddStudent() {
  const [addStudent] = useMutation(ADD_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });

  const {
    data: { getLevels: levels } = { levels: [] },
  } = useQuery(GET_LEVELS);

  const {
    data: { getDepartments: departments } = { departments: [] },
  } = useQuery(GET_DEPARTMENTS);

  const router = useRouter();

  const onFinish = async (values) => {
    const level = levels.find(lvl => lvl.id === values.levelId);
    const department = departments.find(dpt => dpt.id === values.departmentId);
    await addStudent({
      variables: {
        ...values,
        serialNumber: level.abbreviation + department.abbreviation + values.serialNumber,
      },
    });
    router.push('/allStudent');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <br />
      <Card>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Photo"
            name="photo"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <ImageUpload />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please input ISBN!' }]}
          >
            <Select style={{ width: 120 }}>
              <Option value="FEMALE">Female</Option>
              <Option value="MALE">Male</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Level"
            name="levelId"
            rules={[{ required: false, message: 'Please input level' }]}
          >
            <Select style={{ width: 120 }}>
              {(levels || []).map(
                level => <Option key={level.id} value={level.id}>{level.name}</Option>,
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Department"
            name="departmentId"
            rules={[{ required: true, message: 'Please input department' }]}
          >
            <Select style={{ width: 120 }}>
              {(departments || []).map(department => (
                <Option key={department.id} value={department.id}>{department.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Roll No."
            name="serialNumber"
            rules={[{ required: true, message: 'Please input roll no' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: true, message: 'Please input contact number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Please input dob' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Valid Upto"
            name="validUpto"
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button shape="round" icon={<PlusOutlined />} type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default AddStudent;
