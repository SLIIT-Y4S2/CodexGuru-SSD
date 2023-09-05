/**
 * EditExamPage implementation for lab instructor
 */

import EditExam from "@/components/exams-instructor/EditExam";
import React from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          name: "next.js",
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps<{
  repo: Repo;
}> = async () => {
  const res = await fetch("http://localhost:5000/api/v1/exams");
  const repo = await res.json();
  return { props: { repo } };
};

const EditExamPage: React.FC = ({ repo }) => {
  return <EditExam />;
};

export default EditExamPage;
