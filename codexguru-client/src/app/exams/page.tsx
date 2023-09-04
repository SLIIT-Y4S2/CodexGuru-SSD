/**
 * ExamsPage implementation for lab instructor
 */
"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Divider, Tabs } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import Link from "next/link";
import {ExamCon}

const { data, createExam, getAllExams, getExam, updateExam, deleteExam } = useContext(ExamsC)

const items = new Array(4).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `YEAR ${id}`,
    key: id,
    children: (
      <div
        style={{
          gap: "100px",
          display: "flex",
          height: "100%",
          marginRight: "50px",
          padding: "20px",
          border: "1px solid black",
        }}
      >
        <LaptopOutlined />
        <div>IT3040</div>
        <div>Data Structures and Algorithms</div>
        <Link href="#">view</Link>
      </div>
    ),
  };
});

const App: React.FC = () => {
  return (
    <>
      <Tabs items={items} style={{ marginLeft: "50px", marginTop: "50px" }} />
    </>
  );
};

export default App;
