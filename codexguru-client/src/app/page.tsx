import theme from "@/theme/themeConfig";
import { Button, ConfigProvider } from "antd";

export default function Home() {
  return (
    <main>
      <ConfigProvider theme={theme}>
        <div className="flex flex-col justify-center items-center  h-screen">
          Login TEST PASSWORD
          <Button type="primary">Button</Button>
        </div>
      </ConfigProvider>
    </main>
  );
}
