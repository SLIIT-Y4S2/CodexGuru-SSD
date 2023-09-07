"use client";
import React, { createContext, useCallback, useEffect } from "react";
import { Answer, ForumContextType, Question } from "@/types/ForumTypes";
import { forumService } from "@/services";
import { useSession } from "next-auth/react";

const ForumContext = createContext<ForumContextType | null>(null);
const { Provider } = ForumContext;

const ForumProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = React.useState<
    string | undefined
  >();
  const [labId, setLabId] = React.useState<string | undefined>();
  const { data: session, status } = useSession();

  const fetchForum = useCallback(async () => {
    if (status === "loading") return; // Do nothing while loading
    if (session?.user.token === undefined) return;
    if (labId === undefined) return;
    try {
      const response = await forumService(session.user.token).getForum(labId);
      setQuestions(response);
    } catch (error) {
      console.log(error);
    }
  }, [session, status, labId]);

  useEffect(() => {
    fetchForum();
  }, [fetchForum]);

  if (status === "loading") return <>loading</>;

  const refreshForum = fetchForum;

  const postQuestion = async (question: Question) => {
    if (session?.user.token === undefined) return;
    try {
      // const response = await forumService(session.user.token).postQuestion(
      //   question
      // );
      // console.log(response);
      // setQuestions((prev) => [...prev, response]);
      setQuestions((prev) => [...prev, question]);
    } catch (error) {
      console.log(error);
    }
  };

  const postAnswer = async (questionId: string, answer: Answer) => {
    if (session?.user.token === undefined) return;
    try {
      // const response = await forumService(session.user.token).postAnswer(
      //   questionId,
      //   answer
      // );
      // console.log(response);
      setQuestions((prev) =>
        prev.map((question) => {
          if (question.id === questionId) {
            return { ...question, answers: [...question.answers, answer] };
          }
          return question;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider
      value={{
        questions,
        postQuestion,
        postAnswer,
        selectedQuestion,
        setSelectedQuestion,
        setLabId,
      }}
    >
      {children}
    </Provider>
  );
};

export { ForumProvider, ForumContext };

const staticQuestions: Question[] = [
  {
    id: "firstQuestion",
    title: "First Question",
    description: "This is the first question",
    answers: [
      {
        id: "firstAnswer",
        description: "This is the first answer for first question",
        author: {
          id: "firstAuthor",
          name: "First Author",
        },
        createdAt: "somedate",
        updatedAt: "somedate",
      },
      {
        id: "firstAnswer",
        description: "This is the second answer for second question",
        author: {
          id: "firstAuthor",
          name: "First Author",
        },
        createdAt: "somedate",
        updatedAt: "somedate",
      },
    ],
    author: {
      id: "firstAuthor",
      name: "First Author",
    },
    createdAt: "somedate",
    updatedAt: "somedate",
  },
  {
    id: "secondQuestion",
    title: "Second Question",
    description: "This is the second question",
    answers: [
      {
        id: "firstAnswer",
        description: "This is the first answer for second question",
        author: {
          id: "firstAuthor",
          name: "First Author",
        },
        createdAt: "somedate",
        updatedAt: "somedate",
      },
    ],
    author: {
      id: "firstAuthor",
      name: "First Author",
    },
    createdAt: "somedate",
    updatedAt: "somedate",
  },
];
