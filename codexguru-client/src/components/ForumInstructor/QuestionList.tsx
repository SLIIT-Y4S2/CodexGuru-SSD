"use client";
import React, { useContext } from "react";
import ForumQuestionRow from "@/components/Forum/ForumQuestionRow";
import { ForumContextType, Question } from "@/types/ForumTypes";
import { ForumContext } from "@/context/ForumProvider";

const QuestionList = ({ questions }: { questions: Question[] }) => {
  return (
    <div>
      {questions?.map((question, index) => (
        <ForumQuestionRow key={index} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
