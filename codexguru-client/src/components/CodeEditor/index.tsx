"use client"
import { useContext } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { CodeEditorContext } from "@/context/CodeEditorContext";
import ICodeEditorContext from "@/interfaces/ICodeContext";

const CodeEditor: React.FC = () => {

    const codeEditorCtx = useContext<ICodeEditorContext | null>(CodeEditorContext);
    const { setSourceCodeHandler } = codeEditorCtx!;

    function handleEditorChange(value: string, event) {
        setSourceCodeHandler(value);
    }

    function handleEditorDidMount(editor: string, monaco: Monaco) {
        console.log("onMount: the editor instance:", editor);
        console.log("onMount: the monaco instance:", monaco);
    }

    function handleEditorWillMount(monaco: Monaco) {
        console.log("beforeMount: the monaco instance:", monaco);
    }

    function handleEditorValidation(markers) {
        // model markers
        // markers.forEach(marker => console.log('onValidate:', marker.message));
    }

    return (
        <div className="">
            <Editor
                theme="vs-dark"
                height={"640px"}
                width={"1440px"}
                defaultLanguage="java"
                defaultValue="// some comment"
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                beforeMount={handleEditorWillMount}
                onValidate={handleEditorValidation}

            />
        </div>
    );
};
export default CodeEditor;
