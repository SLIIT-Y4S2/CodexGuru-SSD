/**
 * ExamsDashboard implementation for students
 */
"use client";

import { ExamsContext } from "@/app/context/ExamsContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function ExamsDashboard() {
  const { data, getAllExams } = useContext(ExamsContext);

  const activeExams = data.filter((exam) => exam.isActive === true);

  useEffect(() => {
    async function fetchData() {
      await getAllExams();
    }

    fetchData();
  }, []);

  return (
    <center>
      <br />
      <ul>
        {activeExams &&
          activeExams.map((activeExam: any) => (
            <li>
              <Link href={`/online-exams/${activeExam.id}`} key={activeExam.id}>
                {activeExam.title}
              </Link>
            </li>
          ))}
      </ul>
    </center>
  );
}
