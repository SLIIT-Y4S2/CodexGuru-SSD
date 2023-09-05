'use client'
import { CodeEditorContext } from "@/context/CodeEditorContext";
import ICodeEditorContext from "@/interfaces/ICodeContext";
import { Button } from "antd";
import { useContext } from "react";

const CustomButton: React.FC = () => {
    const codeEditorCtx = useContext<ICodeEditorContext | null>(CodeEditorContext);
    const { handleCompile } = codeEditorCtx!;
    return (
        <Button type="primary" onClick={handleCompile}>Compile</Button>
    )
}

export default CustomButton;