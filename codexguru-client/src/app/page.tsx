import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import TestBackend from "@/components/TestBackend";

export default function Home() {
  return (
    <div>
      <ConfigProvider theme={theme}>
        <div className="flex flex-col justify-center items-center  h-screen">
          This page needs login to access
          <TestBackend />
        </div>
      </ConfigProvider>
    </div>
  );
}
