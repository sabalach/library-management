/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import {
  Form, Input, Button, Card, message, Table,
  Checkbox, Image, Statistic, Space,
} from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import { PlusOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import {
  BORROW_BOOK, GET_BOOK_LOGS, GET_STUDENT, QUICK_BORROW, RETURN_BOOK,
} from '../queries';
import { columns } from './allBooklog';
import { appendSuffix } from '../utils';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function QuickBorrow() {
  const [quickBorrow] = useMutation(QUICK_BORROW);
  const [borrowBook] = useMutation(BORROW_BOOK);
  const [returnBook] = useMutation(RETURN_BOOK);
  const [form] = Form.useForm();
  const [loadBookLogs, {
    // loading,
    refetch,
    data: { getBookLogs: bookLogs } = { getBookLogs: null },
  }] = useLazyQuery(GET_BOOK_LOGS, { fetchPolicy: 'network-only' });

  const [loadStudent, {
    data: { getStudent: student } = { getStudent: null },
  }] = useLazyQuery(GET_STUDENT);

  const onFinish = async (values) => {
    try {
      message.loading({
        key: 'quick-borrow',
        content: 'Updating',
      });
      if (values.renew) {
        await returnBook({
          variables: {
            bookSerialNumber: values.bookSerialNumber,
          },
        });
        await borrowBook({
          variables: values,
        });
        await refetch();
        form.resetFields();
        message.success({
          key: 'quick-borrow',
          content: 'Sucessfully renewed book',
        });
        return;
      }
      const res = await quickBorrow({
        variables: values,
      });
      const bookLog = get(res, 'data.quickBorrow');
      if (!bookLog) {
        return;
      }
      if (bookLog.returnedDate) {
        message.success({
          key: 'quick-borrow',
          content: `${bookLog.book.name} return sucessful`,
        });
      } else {
        message.success({
          key: 'quick-borrow',
          content: `${bookLog.book.name} sucessfully borrowed`,
        });
      }
      form.resetFields();
      refetch();
    } catch (error) {
      console.log({ error });
      message.error({
        key: 'quick-borrow',
        content: `Failed: ${error.message}`,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const feeVal = useMemo(() => {
    const sem = get(student, 'feePaidUpto', 'unset');
    if (sem === 'unset') {
      return 'Fee Not Updated';
    }
    if (sem === 0) {
      return 'Not paid';
    }
    return `Paid upto ${appendSuffix(Number(sem))} semester`;
  }, [student]);

  return (
    <>
      <br />
      <Card>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
        }}
        >
          <Form
            {...layout}
            style={{ maxWidth: '600px', flex: 3 }}
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Student Serial Number"
              name="studentSerialNumber"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input
                onBlur={() => {
                  // refetch({
                  //   studentSerialNumber: form.getFieldValue('studentSerialNumber'),
                  // });
                  if (!form.getFieldValue('studentSerialNumber')) {
                    return;
                  }
                  loadBookLogs({
                    variables: {
                      studentSerialNumber: form.getFieldValue('studentSerialNumber'),
                    },
                  });
                  loadStudent({
                    variables: {
                      serialNumber: form.getFieldValue('studentSerialNumber'),
                    },
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Book Serial Number"
              name="bookSerialNumber"
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button shape="round" icon={<PlusOutlined />} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

            <Form.Item name="renew" valuePropName="checked" {...tailLayout}>
              <Checkbox>Renew</Checkbox>
            </Form.Item>
          </Form>
          <div style={{ flex: 1 }}>
            {student && (
            <>
              <Space>
                <Image
                  height={130}
                  src={`/img/${get(student, 'photo', '')}`}
                />
                {/* <div>
                  <Title level={5} type="success">{get(student, 'name', '')}</Title>
                </div> */}
              </Space>
              <br />
              <br />
              <Statistic
                title={`${get(student, 'name', '')} Fee Status`}
                value={feeVal}
                valueStyle={{ color: '#3f8600' }}
              />
            </>
            )}
          </div>
        </div>
      </Card>
      <br />
      {bookLogs && (
        <Table
          dataSource={bookLogs}
          columns={columns}
          size="middle"
          pagination={{ defaultPageSize: 8 }}
        />
      )}
    </>
  );
}

export default QuickBorrow;
