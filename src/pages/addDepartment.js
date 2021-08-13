/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Form, Input, Button, Card,
} from 'antd';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import { ADD_DEPARTMENT, GET_DEPARTMENTS } from '../queries';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

function AddDepartment() {
  const [addBook] = useMutation(ADD_DEPARTMENT, {
    refetchQueries: [{ query: GET_DEPARTMENTS }],
  });
  const router = useRouter();

  const onFinish = async (values) => {
    await addBook({
      variables: values,
    });
    router.push('/allDepartment');
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
            label="Abbreviation"
            name="abbreviation"
            rules={[{ required: true, message: 'Please input Abbreviation!' }]}
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

export default AddDepartment;
