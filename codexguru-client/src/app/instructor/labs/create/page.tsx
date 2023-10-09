"use client";
import Uploader from "@/components/Uploader";
import { Button, Checkbox, Form, Input, Select } from "antd";
import React, { useState } from "react";
const { Item: FormItem } = Form;
const CreateLab = () => {
  const [form] = Form.useForm();
  const [isTimeLimited, setIsTimeLimited] = useState<boolean>(false);
  return (
    <div>
      <Form
        onFinish={(values) => {
          console.log(values);
        }}
        layout="vertical"
        form={form}
        requiredMark={false}
        // initialValues={{
        //   labName: "s",
        //   labDescription: "s",
        //   labSheet:
        //     "https://firebasestorage.googleapis.com/v0/b/sliit-y3s2.appspot.com/o/images%2FTutorial01.pdf-2023-10-10%2002%3A43%3A37?alt=media&token=c11f0f4b-45ad-4042-b377-b34258669764",
        // }}
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "10px",
          padding: "10px",
          minWidth: "400px",
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
            <Select.Option value="SPM">Module 1</Select.Option>
            <Select.Option value="DS">Module 2</Select.Option>
            <Select.Option value="CSSE">Module 3</Select.Option>
            <Select.Option value="UEE">Module 4</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="Password" name="password" required>
          <Input />
        </FormItem>
        <FormItem label="Lab Sheet PDF" name="labSheet" required>
          <Uploader />
        </FormItem>
        {/* time limited */}
        <FormItem>
          <Checkbox
            checked={isTimeLimited}
            onChange={(e) => setIsTimeLimited(e.target.checked)}
          >
            Time Limited
          </Checkbox>
        </FormItem>
        {isTimeLimited ? (
          <>
            <FormItem label="Date" name="startDate" required>
              <Input type="date" />
            </FormItem>
            <FormItem label="Time" name="startTime" required>
              <Input type="time" />
            </FormItem>
            <FormItem label="Duration" name="duration" required>
              <Input type="number" />
            </FormItem>
          </>
        ) : null}
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
