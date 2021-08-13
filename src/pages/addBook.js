/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Form, Input, Button, Card, Select,
} from 'antd';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import { ADD_BOOK, GET_BOOKS } from '../queries';

const { Option } = Select;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

function AddBook() {
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const router = useRouter();

  const onFinish = async (values) => {
    await addBook({
      variables: values,
    });
    router.push('/allBook');
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
            label="Author"
            name="author"
            rules={[{ required: true, message: 'Please input author!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ISBN"
            name="isbn"
            rules={[{ required: true, message: 'Please input ISBN!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Condition"
            name="condition"
            rules={[{ required: true, message: 'Please input condition!' }]}
          >
            <Select style={{ width: 120 }}>
              <Option value="NEW">New</Option>
              <Option value="OLD">Old</Option>
              <Option value="DAMAGED">Damaged</Option>
              <Option value="LOST">Lost</Option>
            </Select>
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

export default AddBook;
