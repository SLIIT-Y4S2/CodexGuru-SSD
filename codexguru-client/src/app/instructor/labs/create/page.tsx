"use client";
import Uploader from "@/components/Uploader";
import { Button, Form, Input, Select } from "antd";
import React from "react";
const { Item: FormItem } = Form;
const CreateLab = () => {
  const [form] = Form.useForm();
  return (
    <div>
      CreateLab
      <Form
        onFinish={(values) => {
          console.log(values);
        }}
        layout="vertical"
        form={form}
        initialValues={{
          labName: "s",
          labDescription: "s",
          labSheet:
            "https://firebasestorage.googleapis.com/v0/b/sliit-y3s2.appspot.com/o/images%2FTutorial01.pdf-2023-10-10%2002%3A43%3A37?alt=media&token=c11f0f4b-45ad-4042-b377-b34258669764",
        }}
      >
        <FormItem label="Lab Name" name="labName" required>
          <Input />
        </FormItem>
        <FormItem label="Lab Description" name="labDescription" required>
          <Input />
        </FormItem>
        <FormItem label="Year" name="year" required>
          <Select>
            <Select.Option value="1">Year 1</Select.Option>
            <Select.Option value="2">Year 2</Select.Option>
            <Select.Option value="3">Year 3</Select.Option>
            <Select.Option value="4">Year 4</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="Semester" name="semester" required>
          <Select>
            <Select.Option value="1">Semester 1</Select.Option>
            <Select.Option value="2">Semester 2</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="Module" name="module" required>
          <Select>
            <Select.Option value="1">Module 1</Select.Option>
            <Select.Option value="2">Module 2</Select.Option>
            <Select.Option value="3">Module 3</Select.Option>
            <Select.Option value="4">Module 4</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="Password" name="password" required>
          <Input />
        </FormItem>
        <FormItem label="Lab Sheet PDF" name="labSheet" required>
          <Uploader />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Create Lab
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default CreateLab;
