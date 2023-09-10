import React, { useContext } from "react";
import Link from "next/link";
import { ForumContextType, Question } from "@/types/ForumTypes";
import { ForumContext } from "@/context/ForumProvider";
interface Params {
  question: Question;
}
const ForumQuestionRow = ({ question }: Params) => {
  const { setSelectedQuestionId } = useContext(
    ForumContext
  ) as ForumContextType;

  // const question = questions.find((q) => q.id === selectedQuestionId);
  return (
    <div
      className="flex flex-col py-2 px-4 border-2 my-2 gap-1"
      onClick={() => {
        setSelectedQuestionId(question._id);
      }}
    >
      <h3 className="text-3xl">{question.title}</h3>
      <p>{question.description.slice(0, 80)}</p>
      <p>Answers({question.answers.length})</p>
      <div className="flex justify-end">
        <span>
          {question.author?.firstName} {question.author?.lastName}
        </span>
      </div>
    </div>
  );
};

export default ForumQuestionRow;
