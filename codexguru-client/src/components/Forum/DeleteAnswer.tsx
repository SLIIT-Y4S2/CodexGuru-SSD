"use client";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import { DeleteFilled } from "@ant-design/icons";
import { Form, Input, Modal, Popconfirm } from "antd";
import React, { useContext, useState } from "react";

const DeleteAnswer = ({
  questionId,
  answerId,
}: {
  questionId: string;
  answerId: string;
}) => {
  const { deleteAnswer } = useContext(ForumContext) as ForumContextType;
  // const { confirm } = Modal;
  // function showConfirm() {
  //   confirm({
  //     title: "Do you want to delete question?",

  // async onOk() {
  //   try {
  //     await deleteAnswer(questionId, answerId);
  //   } catch (e) {
  //     return console.log("Oops errors!");
  //   }
  // },
  //     onCancel() {},
  //   });
  // }

  const deleteAnswerAsync = async () => {
    try {
      await deleteAnswer(questionId, answerId);
    } catch (e) {
      return console.log("errors!");
    }
  };
  return (
    <Popconfirm
      title="Delete the Answer"
      description="Are you sure to delete this Answer?"
      onConfirm={deleteAnswerAsync}
      okText="Yes"
      cancelText="No"
      okButtonProps={{ className: "bg-custom-site-color" }}
    >
      <button
        className=" hover:bg-gray-100 hover:text-red-500 text-gray-500 font-bold py-2 px-4 rounded-full text-xl"
        title="Delete Answer"
      >
        <DeleteFilled />
      </button>
    </Popconfirm>
  );
};

export default DeleteAnswer;
