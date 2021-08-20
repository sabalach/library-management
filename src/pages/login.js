import {
  Form, Input, Button, Checkbox, Card, message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { LOGIN } from '../queries';

const Login = () => {
  const [login] = useMutation(LOGIN);
  const router = useRouter();
  const onFinish = async (values) => {
    message.loading({
      key: 'login',
      content: 'Logging in',
    });
    const {
      data: { login: token } = { login: null },
    } = await login({
      variables: {
        username: values.username,
        password: values.password,
      },
    });
    if (!token) {
      message.error({
        key: 'login',
        content: 'Login failed',
      });
      return;
    }
    localStorage.setItem('token', token);
    message.success({
      key: 'login',
      content: 'Sucessfylly logged in',
    });
    router.push('/dashboard');
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{
          maxWidth: '500px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Card style={{
          padding: '20px',
          borderRadius: '5px',
        }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>

          </Form.Item>
        </Card>
      </Form>
    </div>
  );
};

export default Login;
