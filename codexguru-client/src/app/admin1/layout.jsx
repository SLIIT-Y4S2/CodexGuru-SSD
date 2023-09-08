"use client";
import React, { useState } from 'react';
import theme1 from "@/theme/themeConfig";
import { useRouter } from 'next/navigation';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from 'antd';
import UserList from '@/components/userManagement/UserList';


const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const items = [
  getItem('Dashboard', 1, <PieChartOutlined />),
  getItem('Creat Account', 2, <DesktopOutlined />),
  getItem('Users', 'sub1', <UserOutlined />, [
    getItem('Students', '3'),
    getItem('Lab Instructors', '4'),
    getItem('Admins', '5'),
  ]),
  getItem('Reports', 'sub2', <FileOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Settings', '9', <FileOutlined />),
];


export default function DashboardLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  const handleMenuItemClick = (key) => {

    switch (key) {
      case '1':
        router.push('/admin1/dashboard');
        break;
      case '2':
        router.push('/admin1/createAccount');
        break;
      case '3':
        router.push('/admin1/users/students');
        break;
      default:
        console.log(key);
    }

    console.log(key);
  };





  return <section>

    <ConfigProvider theme={theme1}>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => handleMenuItemClick(key)} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Codexguru ©2023 Created by group 73
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>



  </section>
}