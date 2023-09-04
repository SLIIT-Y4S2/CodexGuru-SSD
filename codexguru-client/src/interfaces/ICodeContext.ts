export default interface ICodeEditorContext {
    output: string;
    setLanguageIdHandler: (languageId: number) => void;
    setSourceCodeHandler: (sourceCode: string) => void;
    setStdinHandler: (stdin: string[]) => void;
    handleCompile: () => void;
}