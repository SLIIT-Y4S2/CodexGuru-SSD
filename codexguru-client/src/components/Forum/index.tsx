"use client";
import React, { useContext } from "react";
import ForumQuestionCol from "./ForumQuestionRow";
import QuestionList from "./QuestionList";
import QuestionView from "./QuestionView";
import { ForumContext } from "@/store/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";

const Forum = ({ labId }: { labId: string }) => {
  const { questions, selectedQuestion, setLabId } = useContext(
    ForumContext
  ) as ForumContextType;

  React.useEffect(() => {
    setLabId(labId);
  }, [labId, setLabId]);

  return (
    <div className="flex flex-col m-2">
      <QuestionList questions={questions} />
      <QuestionView />
    </div>
  );
};

export default Forum;
