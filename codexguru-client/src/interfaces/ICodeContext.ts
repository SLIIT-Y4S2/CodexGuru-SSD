import ICompileOutput from "./ICompileOutput";

export default interface ICodeEditorContext {
    languageId: number;
    languageName: string;
    languageValue: string;
    theme: string;
    stdin: string;
    output: ICompileOutput | null;
    setLanguageHandler: (languageId: number) => void;
    setSourceCodeHandler: (sourceCode: string) => void;
    setThemeHandler: (theme: string) => void;
    setStdinHandler: (stdin: string) => void;
    handleCompile: () => void;
}