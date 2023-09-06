'use client'
import CodeEditor from "@/components/CodeEditor";
import CodeEditorContextProvider from "@/context/CodeEditorContext";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";

export default function Home() {


    return (
        <ConfigProvider theme={theme}>
            <div className="h-screen w-full bg-custom-light-gray relative">
                <CodeEditor />
            </div>
        </ConfigProvider>
    );
}
