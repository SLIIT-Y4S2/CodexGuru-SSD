import React, { useContext } from "react";
import Link from "next/link";
import { ForumContextType, Question } from "@/types/ForumTypes";
import { ForumContext } from "@/store/ForumProvider";
interface Params {
  question: Question;
}
const ForumQuestionRow = ({ question }: Params) => {
  const { setSelectedQuestion } = useContext(ForumContext) as ForumContextType;

  // const question = questions.find((q) => q.id === selectedQuestion);
  return (
    <div
      className="flex flex-col py-2 px-4 border-2 border-black my-2 gap-1"
      onClick={() => {
        setSelectedQuestion(question._id);
      }}
    >
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <div className="flex justify-end">
        <span>
          {question.author.firstName} {question.author.lastName}
        </span>
      </div>
    </div>
  );
};

export default ForumQuestionRow;
