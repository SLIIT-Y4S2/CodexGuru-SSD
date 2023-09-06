/**
 * EditExam form implementation
 */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { ExamsContext } from "@/app/context/ExamsContext";
import { Button, Form, Input, InputNumber, Select, TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function EditExam() {
  const { getExam, updateExam } = useContext(ExamsContext);

  useEffect(() => {
    async function fetchData() {
      const exam = await getExam(window.location.pathname.split("/")[3]);

      setModuleCode(exam.code);
      setExamTitle(exam.title);
      setDescription(exam.description);
      setYear(exam.year);
      setSemester(exam.semester);
      setNoOfQuestions(exam.noOfQuestions);
      setPassMark(exam.passMark);
      setPassword(exam.password);
      setDuration(exam.duration);
    }

    fetchData();
  }, []);

  const [moduleCode, setModuleCode] = React.useState("");
  const [examTitle, setExamTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [year, setYear] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [noOfQuestions, setNoOfQuestions] = React.useState("");
  const [passMark, setPassMark] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [duration, setDuration] = React.useState("");

  return (
    <center>
      <Form
        onFinish={() =>
          updateExam(Number(window.location.pathname.split("/")[3]), {
            code: moduleCode,
            title: examTitle,
            description: description,
            year: year,
            semester: semester,
            noOfQuestions: noOfQuestions,
            passMark: passMark,
            password: password,
            duration: duration,
          })
        }
        // {...formItemLayout}
        style={{ maxWidth: 600, marginTop: "50px" }}
      >
        <Form.Item>
          <Input
            value={moduleCode}
            placeholder="Module code"
            required
            onChange={(e) => setModuleCode(e.target.value)}
          />
        </Form.Item>
        <Form.Item hasFeedback validateStatus="success">
          <Input
            value={examTitle}
            placeholder="Exam title"
            id="success"
            required
            onChange={(e) => setExamTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item hasFeedback>
          <Input.TextArea
            value={description}
            placeholder="Enter any rules and information about the exam"
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
              value={year}
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
              value={semester}
              defaultValue={1}
              style={{ width: "50%" }}
              options={[
                { value: 1, label: "Semester 1" },
                { value: 2, label: "Semester  2" },
              ]}
              onChange={(e: any) => {
                setSemester(e);
              }}
            />
          </div>
        </Form.Item>

        <Form.Item hasFeedback validateStatus="">
          <InputNumber
            value={noOfQuestions}
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
            value={passMark}
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
            value={password}
            placeholder="Exam password"
            required
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <TimePicker
            value={dayjs(duration, "HH:mm:ss")}
            onChange={(e) => {
              // console.log(dayjs("4:15:05", "HH:mm:ss"));
              const hrs = e.$H ? e.$H : "00";
              const mins = e.$m ? e.$m : "00";
              const secs = e.$s ? e.$s : "00";

              setDuration(`${hrs}:${mins}:${secs}`);
            }}
            format="HH:mm:ss"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Button type="primary" size="large" htmlType="submit">
          SAVE
        </Button>
      </Form>
    </center>
  );
}
