/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  Form, Input, Button, Card, Select,
} from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { EditOutlined } from '@ant-design/icons';
import { GET_BOOK, UPDATE_BOOK } from '../queries';

const { Option } = Select;

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

function EditStudent() {
  const router = useRouter();
  const [form] = Form.useForm();

  const { id: bookId } = router.query;

  const {
    data: { getBook: book } = { getStudent: null },
  } = useQuery(GET_BOOK, {
    variables: {
      id: bookId,
    },
  });

  useEffect(() => {
    if (!book) return;

    form.setFieldsValue({
      name: book.name,
      author: book.author,
      isbn: book.isbn,
      condition: book.condition,
    });
  }, [book]);

  const [updateStudent] = useMutation(UPDATE_BOOK);

  const onFinish = async (values) => {
    await updateStudent({
      variables: {
        id: bookId,
        ...values,
      },
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
          form={form}
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
            <Button shape="round" icon={<EditOutlined />} type="primary" htmlType="submit">
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default EditStudent;
