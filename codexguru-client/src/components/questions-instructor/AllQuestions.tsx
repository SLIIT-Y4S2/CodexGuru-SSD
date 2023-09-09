"use client";

import React, { useContext, useState, useEffect } from "react";
import { Button, Collapse, FloatButton } from "antd";
import ConfirmModal from "./ConfirmModal";
import Link from "next/link";
import { ExamsContext } from "@/app/context/ExamsContext";
import {
  CaretRightOutlined,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";

export default function AllQuestions() {
  const { getExam } = useContext(ExamsContext);
  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const foundExam = await getExam(window.location.pathname.split("/")[2]);
      const relevantQuestions = await foundExam.questionsList;

      setQuestionsList(relevantQuestions);
    }

    fetchData();
  }, []);

  let questions = [];

  for (let q of questionsList) {
    questions.push({
      key: questionsList.indexOf(q).toString(),
      label: questionsList.indexOf(q) + 1 + ". " + q.name,
      children: (
        <ul>
          {q.list.map((choice) => (
            <li>
              <CaretRightOutlined />
              {choice.option + (choice.correctness === "true" ? " ✔" : "")}
            </li>
          ))}
          <br />
          <Button
            icon={<EditFilled />}
            type="primary"
            ghost
            style={{ color: "#faad14" }}
          >
            EDIT
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;
          <ConfirmModal
            examID={window.location.pathname.split("/")[2]}
            questionID={questions.indexOf(q)}
          />
        </ul>
      ),
    });
  }

  return (
    <>
      <div>
        {questions.length !== 0 ? (
          <Collapse
            items={questions}
            style={{ marginLeft: "50px", marginRight: "50px" }}
          />
        ) : (
          <div style={{ marginLeft: "50px" }}>No questions found!</div>
        )}
        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          style={{ height: "50px", width: "50px" }}
          href={`/exam-questions/new/${window.location.pathname.split("/")[2]}`}
        />
      </div>
    </>
  );
}
