"use client";
import React from "react";
import {
  CalculatorOutlined,
  CodeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  link?: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: link ? <Link href={link}>{label}</Link> : <>{label}</>,
  } as MenuItem;
}

const items: MenuItem[] = [
  // getItem("Option 1", "/instructor/labs", "1", <UserOutlined />),
  // getItem("Option 2", "/instructor/labs", "2", <UserOutlined />),
  getItem("Dashboard", "/instructor", "1", <HomeOutlined />),
  getItem("Lab Sessions", "", "sub1", <CodeOutlined />, [
    getItem("All Labs", "/instructor/labs", "2"),
    getItem("Create", "/instructor/labs/create", "3"),
    getItem("Report", "/instructor/labs/reports", "4"),
  ]),
  getItem("Exams", "", "sub2", <CalculatorOutlined />, [
    getItem("All Exams", "/instructor/exams", "6"),
    getItem("Create", "/instructor/exams/create", "8"),
    getItem("Report", "/instructor/exams/reports", "9"),
  ]),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-[93.9vh]">
      <Sider breakpoint="lg" collapsedWidth="100">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={undefined}
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }} className="bg-red-600">
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
            className="overflow-y-auto h-full"
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Codexguru ©2023 Created by group 73
        </Footer>
      </Layout>
    </Layout>
  );
}
