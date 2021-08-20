/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  Form, Input, Button, Card, Select,
} from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { EditOutlined } from '@ant-design/icons';
import {
  GET_DEPARTMENTS, GET_LEVELS, GET_STUDENT, UPDATE_STUDENT,
} from '../queries';
import ImageUpload from '../components/ImgUpload';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 5 },
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
      levelId: student.level.id,
      departmentId: student.department.id,
      serialNumber: student.serialNumber,
      gender: student.gender,
      photo: student.photo,
      address: student.address,
      contactNumber: student.contactNumber,
      dob: student.dob,
      validUpto: student.validUpto,
    });
  }, [student]);

  const [updateStudent] = useMutation(UPDATE_STUDENT);

  const {
    data: { getLevels: levels } = { levels: [] },
  } = useQuery(GET_LEVELS);

  const {
    data: { getDepartments: departments } = { departments: [] },
  } = useQuery(GET_DEPARTMENTS);

  const onFinish = async (values) => {
    // eslint-disable-next-line prefer-const
    let { photo, ...otherVals } = values;
    if (typeof values.photo === 'object') {
      otherVals = {
        ...otherVals,
        photo,
      };
    }
    await updateStudent({
      variables: {
        id: studentId,
        ...otherVals,
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
            label="Photo"
            name="photo"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <ImageUpload />
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
