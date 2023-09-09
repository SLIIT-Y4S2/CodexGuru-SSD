"use client";

import React, { useContext, useState, useEffect } from "react";
import { Button, Collapse } from "antd";
import ConfirmModal from "./ConfirmModal";
import Link from "next/link";
import { ExamsContext } from "@/app/context/ExamsContext";

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
              {"-> " +
                choice.option +
                (choice.correctness === "true" ? " ✔" : "")}
            </li>
          ))}
          <br />
          <Button type="primary">EDIT</Button> &nbsp;&nbsp;&nbsp;
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
