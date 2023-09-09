"use client";
import React, { useContext } from "react";
import ForumQuestionCol from "./ForumQuestionRow";
import QuestionList from "./QuestionList";
import QuestionView from "./QuestionView";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";

const Forum = ({ labId }: { labId: string }) => {
  const { questions, selectedQuestionId, setLabId, isLoading, error } =
    useContext(ForumContext) as ForumContextType;

  React.useEffect(() => {
    setLabId(labId);
  }, [labId, setLabId]);

  if (isLoading) return <div>loading</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="flex flex-col m-2 border-solid border-black border-2 p-2">
      {selectedQuestionId ? (
        <QuestionView />
      ) : (
        <QuestionList questions={questions} />
      )}
    </div>
  );
};

export default Forum;
