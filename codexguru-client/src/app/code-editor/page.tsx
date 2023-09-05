import CodeEditor from "@/components/CodeEditor";
import Output from "@/components/CodeEditor/Output";
import CodeEditorContextProvider from "@/context/CodeEditorContext";
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider } from "antd";
import CustomButton from "@/components/common/CustomButton";

export default function Home() {


    return (
        <main>
            <ConfigProvider theme={theme}>
                <div className="h-screen w-screen bg-custom-light-gray">
                    <div className="mx-56">
                        <CodeEditorContextProvider>
                            <CustomButton />
                            <CodeEditor />
                            <Output />
                        </CodeEditorContextProvider>
                    </div>
                </div>
            </ConfigProvider>
        </main>
    );
}
