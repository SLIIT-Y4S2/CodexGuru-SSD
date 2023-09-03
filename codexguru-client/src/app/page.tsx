import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  return (
    <main>
      <ConfigProvider theme={theme}>
        <div className="flex flex-col justify-center items-center  h-screen">
          Login TEST PASSWORD
          <LogoutButton />
        </div>
      </ConfigProvider>
    </main>
  );
}
