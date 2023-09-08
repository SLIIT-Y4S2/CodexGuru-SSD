"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import Card from "antd/es/card/Card";
import { ExamsContext } from "@/app/context/ExamsContext";
import { verifyPassword } from "../../utils/OnlineExamUtil";
import ExamTemplate from "@/components/exams-students/ExamTemplate";

export async function getStaticPaths() {
  let examPaths = [];

  try {
    const res = await fetch("http://localhost:5000/api/v1/exams");

    const data = await res.json();

    const exams = await data.exams.filter((exam) => exam.isActive === true);

    for (let exam of exams) {
      examPaths.push({ params: { id: exam.id.toString() } });
    }
  } catch (err) {
    console.log(err.message);
  }

  return {
    paths: examPaths,
    fallback: false, // can also be true or 'blocking'
  };
}

export default function StartExamPage() {
  const { getExam } = useContext(ExamsContext);
  const [pwd, setPwd] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [actualPwd, setActualPwd] = useState("");

  const [validPwd, setValidPwd] = useState(null);

  let exam;

  useEffect(() => {
    async function fetchData() {
      exam = await getExam(window.location.pathname.split("/")[2]);

      setTitle(exam.title);
      setDescription(exam.description);
      setActualPwd(exam.password);
    }

    fetchData();
  }, []);

  if (validPwd === true) {
    return <ExamTemplate />;
  }

  return (
    <center>
      <Card
        title={title}
        bordered={false}
        style={{ width: 300 }}
        style={{
          width: "50%",
        }}
      >
        <div>{description}</div> <br />
        <Input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <br />
        <br />
        <Button
          onClick={() => {
            setValidPwd(verifyPassword(pwd, actualPwd));
          }}
        >
          ATTEMPT
        </Button>
      </Card>
    </center>
  );
}
