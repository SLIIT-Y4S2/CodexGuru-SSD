"use client";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import { Form, Input } from "antd";
import React, { useContext } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

const AddAnswer = ({ questionId }: { questionId: string }) => {
  const { Item: FormItem } = Form;
  const { postAnswer } = useContext(ForumContext) as ForumContextType;
  const [form] = Form.useForm();

  return (
    <div>
      <div className="">
        <Form
          layout="vertical"
          form={form}
          onFinish={async (values) => {
            const newAnswer: { description: string } = {
              description: values.answer,
            };
            await postAnswer(questionId, newAnswer);

            // reset form
            form.resetFields();
          }}
        >
          <FormItem
            name="answer"
            rules={[
              { required: true, message: "Please input your answer first!" },
            ]}
          >
            {/* <CustomInput /> */}
            <Input.TextArea />
          </FormItem>
          <FormItem>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default AddAnswer;

// interface MyInputProps {
//   value: number;
//   onChange: (e: any) => void;
// }
// const CustomInput: FC<MyInputProps> = ({ value, onChange }: MyInputProps) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: "<p>Hello World! 🌎️</p>",
//   });
//   console.log("content", editor ? editor?.getText() : "");
//   return (
//     <>
//       <EditorContent
//         editor={editor}
//         onChange={(e) => {
//           onChange(e);
//         }}
//         value={value}
//       />
//     </>
//   );
// };
