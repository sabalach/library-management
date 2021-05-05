/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  Form, Input, Button, Card, Select,
  InputNumber,
} from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { EditOutlined } from '@ant-design/icons';
import SiteLayout from '../components/SiteLayout';
import { GET_STUDENT, UPDATE_STUDENT } from '../queries';

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

  const { id: studentId } = router.query;

  const {
    data: { getStudent: student } = { getStudent: null },
  } = useQuery(GET_STUDENT, {
    variables: {
      id: studentId,
    },
  });

  useEffect(() => {
    if (!student) return;

    form.setFieldsValue({
      name: student.name,
      grade: student.grade,
      gender: student.gender,
    });
  }, [student]);

  const [updateStudent] = useMutation(UPDATE_STUDENT);

  const onFinish = async (values) => {
    await updateStudent({
      variables: {
        id: studentId,
        ...values,
      },
    });
    router.push('/allStudent');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <SiteLayout selectedKeys={['student', 'editStudent']} subTitle="Edit Student">
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
            label="Grade"
            name="grade"
            rules={[{ required: true, message: 'Please input grade!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please input gender!' }]}
          >
            <Select style={{ width: 120 }}>
              <Option value="FEMALE">Female</Option>
              <Option value="MALE">Male</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button shape="round" icon={<EditOutlined />} type="primary" htmlType="submit">
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </SiteLayout>
  );
}

export default EditStudent;
