"use client";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import { Form, Input, Modal } from "antd";
import React, { useContext, useState } from "react";

const DeleteAnswer = ({
  questionId,
  answerId,
}: {
  questionId: string;
  answerId: string;
}) => {
  const { deleteAnswer } = useContext(ForumContext) as ForumContextType;
  const { confirm } = Modal;
  function showConfirm() {
    confirm({
      title: "Do you want to delete question?",

      async onOk() {
        try {
          await deleteAnswer(questionId, answerId);
        } catch (e) {
          return console.log("Oops errors!");
        }
      },
      onCancel() {},
    });
  }
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={showConfirm}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteAnswer;
