"use client";
import React, { useContext } from "react";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import AddComment from "./AddAnswer";
import { useSession } from "next-auth/react";
import DeleteQuestion from "./DeleteQuestion";
import DeleteAnswer from "./DeleteAnswer";
import UpdateQuestion from "./UpdateQuestion";
import UpdateAnswer from "./UpdateAnswer";

const QuestionView = () => {
  const {
    questions,
    selectedQuestionId,
    setSelectedQuestionId,
    deleteQuestion,
  } = useContext(ForumContext) as ForumContextType;

  const { data: session, status } = useSession();

  if (!selectedQuestionId || !questions) {
    return <div></div>;
  }
  const question = questions.find((q) => q._id === selectedQuestionId);
  if (!selectedQuestionId || !question) {
    return <div>not selected</div>;
  }

  if (status === "loading" || !session?.user) return <>loading</>;
  return (
    <div className="">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setSelectedQuestionId(undefined);
        }}
      >
        Back
      </button>
      {question.author._id == session.user.id.toString() && (
        <>
          <DeleteQuestion questionId={question._id} />
          <UpdateQuestion question={question} />
        </>
      )}
      <h3 className="text-3xl">{question.title}</h3>
      <p>{question.description}</p>
      <div className="flex justify-end">
        <span>
          {question.author?.firstName} {question?.author.lastName}
        </span>
      </div>
      <div className="flex flex-col ">
        {question.answers.map((answer, index) => (
          <div
            className="flex flex-col bg-yellow-50 border-2 my-1 p-2"
            key={index}
          >
            <p>{answer.description}</p>
            <div className="flex justify-end">
              {answer.author._id == session.user.id.toString() && (
                <>
                  <DeleteAnswer
                    questionId={question._id}
                    answerId={answer._id}
                  />
                  <UpdateAnswer questionId={question._id} answer={answer} />
                </>
              )}
              <span>
                {answer.author?.firstName} {answer.author?.lastName}
              </span>
            </div>
          </div>
        ))}
        <AddComment questionId={question._id} />
      </div>
    </div>
  );
};

export default QuestionView;
