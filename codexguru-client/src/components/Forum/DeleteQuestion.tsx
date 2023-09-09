"use client";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import React, { useContext, useState } from "react";

const DeleteQuestion = ({ questionId }: { questionId: string }) => {
  const { deleteQuestion, setSelectedQuestionId } = useContext(
    ForumContext
  ) as ForumContextType;
  const { confirm } = Modal;
  function showConfirm() {
    confirm({
      title: "Do you want to delete question?",

      async onOk() {
        try {
          await deleteQuestion(questionId);
          setSelectedQuestionId(undefined);
        } catch (e) {
          return console.log("Oops errors!");
        }
      },
      onCancel() {},
    });
  }
  return (
    <button
      className=" hover:bg-gray-200 hover:text-red-400 font-bold py-2 px-4 rounded-full text-xl"
      onClick={showConfirm}
      title="Delete Question"
    >
      <DeleteFilled />
    </button>
  );
};

export default DeleteQuestion;
