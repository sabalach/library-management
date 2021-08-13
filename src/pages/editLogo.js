/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Form, Button, Card,
  Image,
} from 'antd';
import { useMutation } from '@apollo/client';
import { PlusOutlined } from '@ant-design/icons';
import { LOGO_UPLOAD } from '../queries';
import ImageUpload from '../components/ImgUpload';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 16 },
};

function EditLogo() {
  const [addBook] = useMutation(LOGO_UPLOAD);

  const [imgKey, setImgKey] = useState(String(new Date().getTime()));

  const onFinish = async (values) => {
    await addBook({
      variables: values,
    });
    setImgKey(String(new Date().getTime()));
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
          key={imgKey}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Image
            width={200}
            src={`/logo.png?q=${imgKey}`}
          />
          <Form.Item
            label="New Logo"
            name="logo"
            rules={[{ required: true, message: 'Please input logo!' }]}
          >
            <ImageUpload />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button shape="round" icon={<PlusOutlined />} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default EditLogo;
