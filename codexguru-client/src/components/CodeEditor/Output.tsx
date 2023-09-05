'use client'
import { useContext } from 'react';
import { CodeEditorContext } from "@/context/CodeEditorContext";
import ICodeEditorContext from "@/interfaces/ICodeContext";

const Output: React.FC = () => {
    const codeEditorCtx = useContext<ICodeEditorContext | null>(CodeEditorContext);
    const { output } = codeEditorCtx!;
    return (
        <div className="bg-custom-black h-[640px] w-[1440px]">
            <h1 className="text-white">{"output >"}</h1>
            <p className='text-white'>{output}</p>
        </div>
    )
}

export default Output;