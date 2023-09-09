/**
 * ExamQuestionsPage implementation
 */

import AllQuestions from "@/components/questions-instructor/AllQuestions";

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

export default function ExamQuestionsPage() {
  return <AllQuestions />;
}
