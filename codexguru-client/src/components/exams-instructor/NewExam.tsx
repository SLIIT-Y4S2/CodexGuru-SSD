/**
 * NewExam form implementation
 */
"use client";
import React, { useContext } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { ExamsContext } from "@/app/context/ExamsContext";

const NewExam: React.FC = () => {
  const { data, createExam } = useContext(ExamsContext);

  /* Set of states for the form inputs */
  const [moduleCode, setModuleCode] = React.useState("");
  const [examTitle, setExamTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [year, setYear] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [noOfQuestions, setNoOfQuestions] = React.useState("");
  const [passMark, setPassMark] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <center>
      <Form
        onFinish={() =>
          createExam({
            code: moduleCode,
            title: examTitle,
            description: description,
            year: year,
            semester: semester,
            noOfQuestions: noOfQuestions,
            passMark: passMark,
            password: password,
          })
        }
        // {...formItemLayout}
        style={{ maxWidth: 600, marginTop: "50px" }}
      >
        <Form.Item>
          <Input
            placeholder="Module code"
            required
            onChange={(e) => setModuleCode(e.target.value)}
          />
        </Form.Item>
        <Form.Item hasFeedback validateStatus="success">
          <Input
            placeholder="Exam title"
            id="success"
            required
            onChange={(e) => setExamTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item hasFeedback>
          <Input.TextArea
            placeholder="Description. Enter any rules and information about the exam"
            id="success"
            allowClear
            autoSize
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: "flex",
              gap: "50px",
            }}
          >
            <Select
              defaultValue={1}
              style={{ width: "50%" }}
              options={[
                { value: 1, label: "Year 1" },
                { value: 2, label: "Year 2" },
                { value: 3, label: "Year 3" },
                { value: 4, label: "Year 4" },
              ]}
              onChange={(e: any) => {
                setYear(e);
              }}
            />
            <Select
              defaultValue={1}
              style={{ width: "50%" }}
              options={[
                { value: 1, label: "Semester 1" },
                { value: 2, label: "Semester  2" },
                { value: 3, label: "Semester 3" },
                { value: 4, label: "Semester 4" },
              ]}
              onChange={(e: any) => {
                setSemester(e);
              }}
            />
          </div>
        </Form.Item>

        <Form.Item hasFeedback validateStatus="">
          <InputNumber
            placeholder="No of questions"
            min={1}
            id="success"
            style={{ width: "100%" }}
            required
            onChange={(e: any) => {
              console.log(typeof e);
              setNoOfQuestions(e);
            }}
          />
        </Form.Item>
        <Form.Item hasFeedback validateStatus="">
          <InputNumber
            placeholder="Pass mark"
            id="success"
            style={{ width: "100%" }}
            required
            onChange={(e: any) => {
              setPassMark(e);
            }}
          />
        </Form.Item>
        <Form.Item hasFeedback validateStatus="">
          <Input
            placeholder="Exam password"
            required
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Button type="primary" size="large" htmlType="submit">
          ADD
        </Button>
      </Form>
    </center>
  );
};

export default NewExam;
