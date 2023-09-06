'use client';
import React, { useContext } from 'react';
import { Select, Space } from 'antd';
import ICodeEditorContext from '@/interfaces/ICodeContext';
import { CodeEditorContext } from '@/context/CodeEditorContext';
import COMMON from '@/CONSTANTS/Common';


const ThemeDropDown: React.FC = () => {
    const themes = [{ value: "vs-dark", label: "Dark" }, { value: "light", label: "Light" }]

    const codeEditorCtx = useContext<ICodeEditorContext | null>(CodeEditorContext);
    const { setThemeHandler, theme } = codeEditorCtx!;

    const handleChange = (value: string) => {
        setThemeHandler(value);
        console.log(
            value
        );
        
    }
    return (
        <Space wrap>
            <Select
                defaultValue={COMMON.DEFAULT_THEME}
                style={{ width: 120 }}
                onChange={handleChange}
                options={themes}
                value={theme}
            />
        </Space>
    )
};

export default ThemeDropDown;