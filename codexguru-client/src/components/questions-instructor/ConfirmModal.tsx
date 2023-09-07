/**
 * ConfirmModal dialog implementation
 */
import { useContext } from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
const { confirm } = Modal;
import { ExamQuestionsContext } from "@/app/context/ExamQuestionsContext";

export default function ConfirmModal({ questionID }) {
  const { deleteQuestion } = useContext(ExamQuestionsContext);
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this question?",
      icon: <ExclamationCircleFilled />,
      content: "This action is permanant. Are you sure?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteQuestion(questionID);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return <Button icon={<DeleteFilled />} onClick={showDeleteConfirm}></Button>;
}
