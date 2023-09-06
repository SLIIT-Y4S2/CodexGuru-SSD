/**
 * ExamModal implementation
 */
import React, { useContext, useState } from "react";
import { Button, Modal, Switch } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { ExamsContext } from "@/app/context/ExamsContext";

export default function ExamModal({ examData }) {
  const caption = examData.code + " - " + examData.title;

  const { updateExamStatus } = useContext(ExamsContext);

  const [isActive, setIsActive] = useState(examData.isActive);

  return (
    <>
      <Button
        type="primary"
        // onClick={() => setOpen(true)}
        onClick={() => {
          Modal.info({
            centered: true,
            width: "1200px",
            title: caption,
            content: (
              <>
                <div>
                  <p style={{ fontWeight: "bold" }}>Status</p>
                  <Switch
                    defaultChecked={isActive}
                    // defaultChecked={isActive}
                    onChange={() => {
                      setIsActive(!isActive);
                    }}
                  />
                </div>
                <br />
                <div style={{ display: "flex", gap: "93px" }}>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Year</p>
                    <p>{examData.year}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Semester</p>
                    <p>{examData.semester}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>No.of questions</p>
                    <p>{examData.noOfQuestions}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Pass Mark</p>
                    <p>{examData.passMark}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Duration</p>
                    <p>{examData.duration}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Exam Password </p>
                    <p>{examData.password}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Created Date</p>
                    <p>{examData.createdDate.toString().split("T")[0]}</p>
                  </div>
                </div>
                <div>
                  {" "}
                  <br />
                  <p style={{ fontWeight: "bold" }}>Instructions</p>
                  <p>{examData.description}</p>
                </div>{" "}
              </>
            ),
            onOk() {
              updateExamStatus(examData.id, examData, !isActive);
            },
          });
        }}
        style={{ justifyContent: "center" }}
      >
        <EyeFilled height={100} width={100} />
      </Button>
    </>
  );
}
