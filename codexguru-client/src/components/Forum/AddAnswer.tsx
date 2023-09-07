"use client";
import { ForumContext } from "@/store/ForumProvider";
import { Answer, ForumContextType } from "@/types/ForumTypes";
import { Form, Input } from "antd";
import React, { useContext } from "react";

const AddAnswer = ({ questionId }: { questionId: string }) => {
  const { Item: FormItem } = Form;
  const { postAnswer } = useContext(ForumContext) as ForumContextType;
  return (
    <div>
      AddAnswer
      <div className="">
        <Form
          layout="vertical"
          onFinish={async (values) => {
            const newAnswer: Answer = {
              id: "newAnswer",
              description: values.answer,
              author: {
                id: "newAuthor",
                name: "newAuthor",
              },
              createdAt: "somedate",
              updatedAt: "somedate",
            };
            await postAnswer(questionId, newAnswer);
          }}
        >
          <FormItem
            label="answer"
            name="answer"
            rules={[
              { required: true, message: "Please input your answer first!" },
            ]}
          >
            <Input type="text" />
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default AddAnswer;
