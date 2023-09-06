"use client";
import React, { useContext } from "react";
import { ForumContext } from "@/store/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import AddComment from "./AddAnswer";

const QuestionView = () => {
  const { questions, selectedQuestion, setSelectedQuestion } = useContext(
    ForumContext
  ) as ForumContextType;
  if (!selectedQuestion || !questions) {
    return <div></div>;
  }
  const question = questions.find((q) => q._id === selectedQuestion);
  if (!selectedQuestion || !question) {
    return <div>not selected</div>;
  }
  return (
    <div className="flex flex-col p-5 bg-green-100">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setSelectedQuestion(undefined);
        }}
      >
        Back
      </button>
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <div className="flex justify-end">
        <span>{question.author.name}</span>
      </div>
      <div className="flex flex-col ">
        {question.answers.map((answer, index) => (
          <div
            className="flex flex-col bg-yellow-50 border-2 my-1 p-2"
            key={index}
          >
            <p>{answer.description}</p>
            <div className="flex justify-end">
              <span>{answer.author.name}</span>
            </div>
          </div>
        ))}
        <AddComment questionId={question.id} />
      </div>
    </div>
  );
};

export default QuestionView;
