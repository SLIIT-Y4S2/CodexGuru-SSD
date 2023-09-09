import LanguageDropdown from "./LanguageDropdown";
import ThemeDropDown from "./ThemeDropDown";
import CompileButton from "./CompileButton";
import OutputWindow from "./OutputWindow";
import InputWindow from "./InputWindows";
import CodeEditor from "./CodeEditor";
import CodeEditorContextProvider from "@/context/CodeEditorContext";

const CodeEditorWindow: React.FC = () => {
  return (
    <CodeEditorContextProvider>
      <div className="mx-auto w-11/12 top-0">
        <div className="grid grid-row-3 grid-flow-col gap-4">
          <div className="row-span-2">
            <div className="grid grid-cols-3 gap-3 mb-5">
              <LanguageDropdown />
              <ThemeDropDown />
              <CompileButton />
            </div>
            <CodeEditor />
          </div>
          <div className="row-span-1 col-span-10">
            <OutputWindow />
          </div>
          <div className="row-span-1 col-span-10">
            <InputWindow />
          </div>
        </div>
      </div>
    </CodeEditorContextProvider>
  );
};
export default CodeEditorWindow;
