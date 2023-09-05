/**
 * EditExamPage implementation for lab instructor
 */
import EditExam from "@/components/exams-instructor/EditExam";
import React, { useContext } from "react";

export async function getStaticPaths() {
  let examPaths = [];

  try {
    const res = await fetch("http://localhost:5000/api/v1/exams");

    const data = await res.json();

    const exams = await data.exams;

    for (let exam of exams) {
      examPaths.push({ params: { id: exam.id.toString() } });
    }
  } catch (err) {
    console.log(err.message);
  }

  return {
    paths: examPaths,
    fallback: false, // can also be true or 'blocking'
  };
}

// export async function getStaticProps(context) {
//   let examData;

//   try {
//     const res = await fetch(
//       `http://localhost:5000/api/v1/exams/${context.params.id}`
//     );

//     const data = await res.json();

//     examData = await data.exams[0];
//     console.log(examData);

//     console.log(examData);
//   } catch (err) {
//     console.log(err.message);
//   }

//   return {
//     // Passed to the page component as props
//     props: { examData },
//   };
// }

export default function EditExamPage() {
  return <EditExam />;
}
