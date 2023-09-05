'use client';
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider } from "antd";
import UserList from "@/components/userManagement/UserList";

export default function Home() {


    return (
        <main>
            <ConfigProvider theme={theme}>
                <UserList/>
            </ConfigProvider>
        </main>
    );
}