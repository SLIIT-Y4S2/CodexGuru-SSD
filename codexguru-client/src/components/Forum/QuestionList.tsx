"use client";
import React, { useContext, useEffect, useState } from "react";
import ForumQuestionRow from "./ForumQuestionRow";
import { ForumContextType, Question } from "@/types/ForumTypes";
import AddQuestion from "./AddQuestion";
import { ForumContext } from "@/context/ForumProvider";
import Search from "antd/es/input/Search";

const QuestionList = ({ questions }: { questions: Question[] }) => {
  const [search, setSearch] = useState("");

  const filteredQuestions = questions.filter(
    (question) =>
      question.title.toLowerCase().includes(search.toLowerCase()) ||
      question.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-2">
        <Search
          placeholder="Have a question? Search here"
          className="w-2/3"
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddQuestion />
      </div>

      {questions?.length === 0 && (
        <div className="min-w-full text-center p-10 text-2xl font-semibold">
          No Questions Yet
        </div>
      )}
      {search && questions?.length !== 0 && filteredQuestions?.length === 0 && (
        <div className="min-w-full text-center p-10 text-2xl font-semibold">
          No Questions Found
        </div>
      )}

      {filteredQuestions?.map((question, index) => (
        <ForumQuestionRow key={index} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
