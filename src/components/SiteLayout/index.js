import {
  Layout, Menu, Avatar, PageHeader,
  Typography,
  Space,
} from 'antd';
import {
  AppstoreOutlined,
  BookFilled,
  ContactsFilled,
  DatabaseFilled,
  ReadOutlined,
  ToolFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import LogoutBtn from '../LogoutBtn';
import ThemeSwitchBtn from '../ThemeSwitchBtn';
import { GET_CONFIG } from '../../queries';

const {
  Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

function SiteLayout({ children, subTitle = '' }) {
  const router = useRouter();
  const { switcher, themes, currentTheme } = useThemeSwitcher();
  useEffect(() => {
    const prevTheme = localStorage.getItem('theme');
    if (prevTheme === 'light') {
      switcher({
        theme: themes.light,
      });
    }
  }, []);

  const {
    data: { getConfig: config } = { getConfig: null },
  } = useQuery(GET_CONFIG);

  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Sider
        // theme={currentTheme}
        theme="dark"
        hidden={router.route === '/login'}
      >
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
          selectedKeys={[(String(router.route || '').replace('/', ''))]}
          onSelect={({ key }) => {
            router.push(`/${key}`);
          }}
          theme={currentTheme === 'light' ? 'dark' : 'light'}
        >
          <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="quickBorrow" icon={<ReadOutlined />}>
            Quick Borrow
          </Menu.Item>
          <SubMenu key="student" icon={<ContactsFilled />} title="Student">
            <Menu.Item key="allStudent">All</Menu.Item>
            <Menu.Item key="addStudent">Add</Menu.Item>
            <Menu.Item key="deleteStudents">Delete</Menu.Item>
            <Menu.Item key="editStudent" disabled>Edit</Menu.Item>
          </SubMenu>
          <SubMenu key="book" icon={<BookFilled />} title="Book">
            <Menu.Item key="allBook">All</Menu.Item>
            <Menu.Item key="newBook">New</Menu.Item>
            <Menu.Item key="oldBook">Old</Menu.Item>
            <Menu.Item key="damagedBook">Damaged</Menu.Item>
            <Menu.Item key="lostBook">Lost</Menu.Item>
            <Menu.Item key="addBook">Add</Menu.Item>
            <Menu.Item key="editBook" disabled>Edit</Menu.Item>
          </SubMenu>
          <SubMenu key="booklog" icon={<DatabaseFilled />} title="Logs">
            <Menu.Item key="allBooklog">All</Menu.Item>
          </SubMenu>
          <SubMenu key="config" icon={<ToolFilled />} title="Config">
            <Menu.Item key="allLevel">All Level</Menu.Item>
            <Menu.Item key="addLevel">Add Level</Menu.Item>
            <Menu.Item key="allDepartment">All Department</Menu.Item>
            <Menu.Item key="addDepartment">Add Department</Menu.Item>
            <Menu.Item key="idCards">Id Cards</Menu.Item>
            <Menu.Item key="bookBarcodes">Book Barcodes</Menu.Item>
            <Menu.Item key="editLogo">Edit Logo</Menu.Item>
            <Menu.Item key="editInfo">Edit Info</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <PageHeader
          className="site-page-header"
          onBack={null}
          title={(
            <Space size={0}>
              <Avatar
                // style={{ backgroundColor: '' }}
                src="/logo.png"
                size={45}
              />
              <div style={{ lineHeight: '22px' }}>
                {config && config.institutionName}
                <Text
                  style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: 'normal',
                  }}
                  type="secondary"
                >
                  Library Management System
                </Text>
              </div>

            </Space>
          )}
          subTitle={subTitle}
          extra={[
            <ThemeSwitchBtn />,
            <LogoutBtn />,
          ]}
        />
        {/* <style jsx global>
          {`
            .site-page-header {
              background: #fff;
              border: 1px solid rgb(235, 237, 240);
            }
          `}
        </style> */}
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Text type="secondary">
            © 2021
          </Text>
        </Footer>
      </Layout>

    </Layout>
  );
}

export default SiteLayout;
