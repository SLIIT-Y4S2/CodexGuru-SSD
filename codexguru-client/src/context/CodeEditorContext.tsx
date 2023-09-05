'use client'
import PATHS from "@/CONSTANTS/PATHS";
import IChildProps from "@/interfaces/IChildProps";
import ICodeEditorContext from "@/interfaces/ICodeContext";
import IReqBody from "@/interfaces/IReqBody";
import axios from "axios";
import { createContext, useState } from "react";

export const CodeEditorContext = createContext<ICodeEditorContext | null>(null);

const CodeEditorContextProvider = ({ children }: IChildProps) => {
    const [sourceCode, setSourceCode] = useState<string>("");
    const [languageId, setLanguageId] = useState<number>(63);
    const [stdin, setStdin] = useState<string[]>([]);
    const [output, setOutput] = useState<string>("");

    //set the language id
    const setLanguageIdHandler = (languageId: number) => {
        setLanguageId(languageId);
    };

    //set the source code
    const setSourceCodeHandler = (sourceCode: string) => {
        setSourceCode(sourceCode);
    };
    //set the stdin
    const setStdinHandler = (stdin: string[]) => {
        setStdin(stdin);
    };

    //handle the compile request
    const handleCompile = () => {
        //set request body
        const bodyData: IReqBody = {
            source_code: sourceCode,
            language_id: languageId,
            stdin: stdin,
        }

        axios
            .post(
                PATHS.COMPLILER_PATH,
                bodyData
            )
            .then(async (res) => {
                setOutput(res.data.stdout);
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <CodeEditorContext.Provider value={{ output, setSourceCodeHandler, setLanguageIdHandler, setStdinHandler, handleCompile }}>
            {children}
        </CodeEditorContext.Provider>
    )
};

export default CodeEditorContextProvider;

// "source_code": "#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf(\"%s\", name);\n  printf(\"hello, %s\n\", name);\n  return 0;\n}",
//     "language_id": 4,
//     "stdin": "world"