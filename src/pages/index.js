import {
  Layout, Menu, Avatar, PageHeader,
} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const {
  Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;

function Home() {
  return (
    <div>
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
          <Menu defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Library Management System"
            subTitle="Home"
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
            <div style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
