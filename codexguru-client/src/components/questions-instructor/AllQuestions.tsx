"use client";

import React, { useContext, useState, useEffect } from "react";
import { ExamQuestionsContext } from "@/app/context/ExamQuestionsContext.js";
import { Button, Collapse } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import ConfirmModal from "./ConfirmModal";
import Link from "next/link";

export default function AllQuestions() {
  const { data, getAllQuestions } = useContext(ExamQuestionsContext);

  useEffect(() => {
    async function fetchData() {
      await getAllQuestions();
    }

    fetchData();
  }, []);

  let questions = [];

  const filteredData = data.filter(
    (question) => question.examID == window.location.pathname.split("/")[2]
  );

  for (let d of filteredData) {
    questions.push({
      key: d.id.toString(),
      label: d.id + 1 + ". " + d.content,
      children: (
        <ul>
          <li>{"a) " + d.option1 + (d.option1 === d.answer ? "✔" : "")}</li>
          <li>{"b) " + d.option2 + (d.option2 === d.answer ? "✔" : "")}</li>
          <li>{"c) " + d.option3 + (d.option3 === d.answer ? "✔" : "")}</li>
          <li>{"d) " + d.option4 + (d.option4 === d.answer ? "✔" : "")}</li>
          <br />
          <Button type="primary">EDIT</Button> &nbsp;&nbsp;&nbsp;
          <ConfirmModal questionID={d.id} />
        </ul>
      ),
    });
  }

  return (
    <>
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <center>
          <Link
            href={`/exam-questions/new/${
              window.location.pathname.split("/")[2]
            }`}
          >
            <Button type="primary">ADD</Button>
          </Link>
        </center>
        <br />
        {questions.length !== 0 ? (
          <Collapse items={questions} />
        ) : (
          <div>No questions found!</div>
        )}
      </div>
    </>
  );
}
