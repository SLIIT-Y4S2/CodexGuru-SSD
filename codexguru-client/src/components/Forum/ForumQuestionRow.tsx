import React, { useContext } from "react";
import Link from "next/link";
import { ForumContextType, Question } from "@/types/ForumTypes";
import { ForumContext } from "@/context/ForumProvider";
import { Card } from "antd";
interface Params {
  question: Question;
}
const ForumQuestionRow = ({ question }: Params) => {
  const { setSelectedQuestionId } = useContext(
    ForumContext
  ) as ForumContextType;

  // const question = questions.find((q) => q.id === selectedQuestionId);
  return (
    <Card
      className="cursor-pointer hover:shadow-xl shadow-lg border-2 border-gray-200"
      onClick={() => {
        setSelectedQuestionId(question._id);
      }}
    >
      <p>Votes : {question.score}</p>
      <h3 className="text-3xl">{question.title}</h3>
      <p>{question.description.slice(0, 80)}</p>
      <p>Answers({question.answers.length})</p>
      <div className="flex justify-end">
        <span>
          {question.author?.firstName} {question.author?.lastName}
        </span>
      </div>
    </Card>
  );
};

export default ForumQuestionRow;
