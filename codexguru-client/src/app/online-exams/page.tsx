/**
 * OnlineExamsPage implementation for students
 */
import ExamTemplate from "@/components/exams-students/ExamTemplate";
import ExamsDashboard from "@/components/exams-students/ExamsDashboard";

export default function OnlineExamsPage() {
  return (
    <>
      <center>
        <div>Exams</div>
      </center>
      <ExamsDashboard />
    </>
  );
}
