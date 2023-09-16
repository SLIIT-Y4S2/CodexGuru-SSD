"use client";
import LabsHorizontalView from "@/components/LabsHorizontalView";
import theme from "@/theme/themeConfig";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

export default function Home() {
  return (
    <StyleProvider hashPriority="high">
      <div className="mx-auto max-w-screen-xl p-3 flex flex-col gap-4 h-screen">
        <p className="text-4xl">Welcome to CodexGuru</p>
        <LabsHorizontalView />
      </div>
    </StyleProvider>
  );
}
