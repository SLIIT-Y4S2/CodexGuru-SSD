"use client";
import React, { useContext } from "react";
import ForumQuestionRow from "./ForumQuestionRow";
import { ForumContextType, Question } from "@/types/ForumTypes";
import AddQuestion from "./AddQuestion";
import { ForumContext } from "@/store/ForumProvider";

const QuestionList = ({ questions }: { questions: Question[] }) => {
  return (
    <div>
      <AddQuestion />
      {questions?.map((question, index) => (
        <ForumQuestionRow key={index} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
