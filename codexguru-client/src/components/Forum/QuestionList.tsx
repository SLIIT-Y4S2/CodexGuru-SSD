"use client";
import React, { useContext } from "react";
import ForumQuestionRow from "./ForumQuestionRow";
import { ForumContextType, Question } from "@/types/ForumTypes";
import AddQuestion from "./AddQuestion";
import { ForumContext } from "@/context/ForumProvider";

const QuestionList = ({ questions }: { questions: Question[] }) => {
  return (
    <div>
      <AddQuestion />
      {questions?.length === 0 && (
        <div className="min-w-full text-center p-10 text-2xl font-semibold">
          No Questions Yet
        </div>
      )}
      {questions?.map((question, index) => (
        <ForumQuestionRow key={index} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
