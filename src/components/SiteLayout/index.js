import {
  Layout, Menu, Avatar, PageHeader,
  Typography,
} from 'antd';
import {
  BookFilled,
  DatabaseFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const {
  Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

function SiteLayout({ children, selectedKeys = ['1'], subTitle = '' }) {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <div style={{
          padding: '10px',
          margin: 'auto auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '20px',
        }}
        >
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
        <Menu
          defaultSelectedKeys={['student']}
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={['student', 'book']}
          onSelect={({ key }) => {
            router.push(`/${key}`);
          }}
        >
          <SubMenu key="student" icon={<UserOutlined />} title="Student">
            <Menu.Item key="allStudent">All</Menu.Item>
            <Menu.Item key="addStudent">Add</Menu.Item>
            <Menu.Item key="editStudent" disabled>Edit</Menu.Item>
          </SubMenu>
          <SubMenu key="book" icon={<BookFilled />} title="Book">
            <Menu.Item key="allBook">All</Menu.Item>
            <Menu.Item key="addBook">Add</Menu.Item>
            <Menu.Item key="editBook" disabled>Edit</Menu.Item>
          </SubMenu>
          <SubMenu key="booklog" icon={<DatabaseFilled />} title="Logs">
            <Menu.Item key="allBooklog">All</Menu.Item>
            <Menu.Item key="borrow">Borrow</Menu.Item>
            <Menu.Item key="return" disabled>Return</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <PageHeader
          className="site-page-header"
          onBack={null}
          title="Library Management System"
          subTitle={subTitle}
        />
        <style jsx global>
          {`
            .site-page-header {
              background: #fff;
              border: 1px solid rgb(235, 237, 240);
            }
          `}
        </style>
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Text type="secondary">
            Developed by
            {' '}
            <a href="https://sabal.com.np" target="_blank" rel="noreferrer">Sabal Acharya</a>
            {' '}
            © 2021 |
            {' '}
            <a href="mailto:info@sabal.com.np">info@sabal.com.np</a>
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default SiteLayout;
