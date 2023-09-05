/**
 * Exams component implementation
 */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, Tabs } from "antd";
import { LaptopOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import Link from "next/link";
import { ExamsContext } from "@/app/context/ExamsContext";
import ExamModal from "./ExamModal";
import ConfirmModal from "./ConfirmModal";

const Exams: React.FC = () => {
  const { data, getAllExams } = useContext(ExamsContext);

  useEffect(() => {
    getAllExams();
  }, []);

  const allExams = new Array(4).fill(null).map((_, i) => {
    const id = String(i + 1);

    // Filter the exams based on the year
    const filteredExams = data.filter((exam: any) => exam.year == id);

    return {
      label: `YEAR ${id}`,
      key: id,
      children:
        filteredExams.length !== 0 ? (
          filteredExams.map((exam: any) => {
            return (
              <>
                <div
                  key={exam.id}
                  style={{
                    gap: "100px",
                    display: "flex",
                    height: "100%",
                    marginRight: "50px",
                    padding: "20px",
                    border: "1px solid black",
                    width: "50%",
                  }}
                >
                  <LaptopOutlined />
                  <div>{exam.code}</div>
                  <div>{exam.title}</div>
                  <ExamModal examData={exam} />
                  <Link href={`/exams/edit/${exam.id}`}>
                    <Button type="primary">
                      <EditFilled />
                    </Button>
                  </Link>
                  <ConfirmModal examID = {exam.id}/>
                </div>{" "}
                <br />
              </>
            );
          })
        ) : (
          <div key={id}>No exams found !</div>
        ),
    };
  });

  return (
    <>
      <Tabs
        items={allExams}
        style={{ marginLeft: "50px", marginTop: "50px" }}
      />
    </>
  );
};

export default Exams;
