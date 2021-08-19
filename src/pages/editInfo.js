/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  Form, Input, Button, Card, message,
} from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { EditOutlined } from '@ant-design/icons';
import { GET_CONFIG, SET_CONFIG } from '../queries';

const layout = {
  // labelCol: { span: 5 },
  // wrapperCol: { span: 4 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

function EditInfo() {
  const [form] = Form.useForm();

  const {
    data: { getConfig: config } = { getConfig: null },
  } = useQuery(GET_CONFIG);

  useEffect(() => {
    if (!config) return;

    form.setFieldsValue({
      ...config,
    });
  }, [config]);

  const [setConfig] = useMutation(SET_CONFIG);

  const onFinish = async (values) => {
    message.loading({
      key: 'editInfo',
      content: 'Updating',
    });
    await setConfig({
      variables: {
        ...values,
        studentLimit: parseInt(values.studentLimit, 10),
        fineAfter: parseInt(values.fineAfter, 10),
      },
      refetchQueries: [{ query: GET_CONFIG }],
    });
    message.success({
      key: 'editInfo',
      content: 'Sucessfully Updated Info',
    });
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
          style={{ maxWidth: '800px' }}
        >
          <Form.Item
            label="Name"
            name="institutionName"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location"
            name="institutionLocation"
            rules={[{ required: true, message: 'Please input location!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact"
            name="institutionContact"
            rules={[{ required: true, message: 'Please input contact!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="abbreviation"
            name="institutionAbb"
            rules={[{ required: true, message: 'Please input abbreviation!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Max No. of Books a student can borrow"
            name="studentLimit"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Fine after days of borrowing book"
            name="fineAfter"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input type="number" />
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

export default EditInfo;
