import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import LabsHorizontalView from "@/components/LabsHorizontalView";
// import TestBackend from "@/components/TestBackend";

export default function Home() {
  return (
    <div>
      <ConfigProvider theme={theme}>
        <div className="flex flex-col gap-2 h-screen">
          <p className="text-4xl">Student Landing Page</p>
          {/* <TestBackend /> */}
          <LabsHorizontalView />
        </div>
      </ConfigProvider>
    </div>
  );
}
