/**
 * ConfirmModal dialog implementation
 */
import { useContext } from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
const { confirm } = Modal;
import { ExamsContext } from "@/app/context/ExamsContext";

export default function ConfirmModal({ examID }) {
  const { deleteExam } = useContext(ExamsContext);
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this exam?",
      icon: <ExclamationCircleFilled />,
      content: "This action is permanant. Are you sure?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteExam(examID);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return <Button icon={<DeleteFilled />} onClick={showDeleteConfirm}></Button>;
}
