/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Form, Input, Button, Card, Select,
  InputNumber,
} from 'antd';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import SiteLayout from '../components/SiteLayout';
import { ADD_STUDENT, GET_STUDENTS } from '../queries';

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
  const router = useRouter();

  const onFinish = async (values) => {
    await addStudent({
      variables: {
        ...values,
        grade: parseInt(values.grade, 10),
      },
    });
    router.push('/allStudent');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <SiteLayout selectedKeys={['student', 'addStudent']} subTitle="Add Student">
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
            label="Grade"
            name="grade"
            rules={[{ required: true, message: 'Please input grade!' }]}
          >
            <InputNumber />
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

          <Form.Item {...tailLayout}>
            <Button shape="round" icon={<PlusOutlined />} type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </SiteLayout>
  );
}

export default AddStudent;
