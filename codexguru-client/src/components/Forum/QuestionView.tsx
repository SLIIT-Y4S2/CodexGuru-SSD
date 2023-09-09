"use client";
import React, { useContext } from "react";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import AddAnswer from "./AddAnswer";
import { useSession } from "next-auth/react";
import DeleteQuestion from "./DeleteQuestion";
import DeleteAnswer from "./DeleteAnswer";
import UpdateQuestion from "./UpdateQuestion";
import UpdateAnswer from "./UpdateAnswer";
import MDEditor from "@uiw/react-md-editor";
import {
  ArrowLeftOutlined,
  DeleteFilled,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { formatRelative } from "date-fns";

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

  // const menuItems: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: <DeleteQuestion questionId={question._id} />,
  //   },
  //   {
  //     key: "2",
  //     label: <UpdateQuestion question={question} />,
  //   },
  // ];
  if (status === "loading" || !session?.user) return <>loading</>;
  return (
    <div className="">
      <div className="flex justify-between align-middle">
        <button
          className=" hover:bg-gray-100  font-bold py-2 px-4 rounded-full text-xl"
          onClick={() => {
            setSelectedQuestionId(undefined);
          }}
          title="Back to Questions"
        >
          <ArrowLeftOutlined />
        </button>
        {question.author._id == session.user.id.toString() && (
          // <Dropdown
          //   menu={{
          //     items: menuItems,
          //   }}
          //   trigger={["click"]}
          // >
          //   <MoreOutlined />
          // </Dropdown>
          <div className="flex">
            <DeleteQuestion questionId={question._id} />
            <UpdateQuestion question={question} />
          </div>
        )}
      </div>
      <h3 className="text-4xl font-medium">{question.title}</h3>
      <div className="flex gap-8">
        <p>
          <span className="text-gray-600">Asked</span>{" "}
          {formatRelative(new Date(question.createdAt), new Date())}
        </p>
        <p>
          <span className="text-gray-600">Modified</span>{" "}
          {formatRelative(new Date(question.updatedAt), new Date())}
        </p>
        <p>
          <span className="text-gray-600">Viewed</span> {question.views}
        </p>
      </div>

      <div className="my-4" data-color-mode="light">
        <MDEditor.Markdown source={question.description} />

        {/* {question.description} */}
      </div>
      <div className="flex justify-end">
        <span>
          <span className="text-gray-600">Asked by</span>{" "}
          {question.author?.firstName} {question?.author.lastName}
        </span>
      </div>
      <div className="flex flex-col ">
        <h4 className="text-2xl"> Answers ({question.answers.length})</h4>
        <AddAnswer questionId={question._id} />
        {question.answers.map((answer, index) => (
          <div
            className="flex flex-col border-2 my-1 p-2"
            key={index}
            data-color-mode="light"
          >
            {answer.author?._id == session.user.id.toString() && (
              <div className="flex justify-end">
                <DeleteAnswer questionId={question._id} answerId={answer._id} />
                <UpdateAnswer questionId={question._id} answer={answer} />
              </div>
            )}
            <div>
              <MDEditor.Markdown source={answer.description} />
              {/* {answer.description} */}
            </div>
            <div className="flex justify-end">
              <span>
                {answer.author?.firstName} {answer.author?.lastName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionView;
