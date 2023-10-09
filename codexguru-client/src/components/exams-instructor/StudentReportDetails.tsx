import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Student Number",
    dataIndex: "studentNumber",
  },
  //   {
  //     title: "Chinese Score",
  //     dataIndex: "chinese",
  //     sorter: {
  //       compare: (a, b) => a.chinese - b.chinese,
  //       multiple: 3,
  //     },
  //   },
  {
    title: "Marks",
    dataIndex: "score",
    sorter: {
      compare: (a, b) => a.score - b.score,
      multiple: 2,
    },
  },
];
const data = [
  {
    key: "1",
    studentNumber: "John Brown",
    chinese: 98,
    math: 60,
    english: 70,
  },
];

// const onChange = (filters, sorter, extra) => {};
export default function StudentReportDetails() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered={true}
      pagination={false}
    />
  );
}
