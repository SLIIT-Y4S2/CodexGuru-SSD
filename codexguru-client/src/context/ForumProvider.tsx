"use client";
import React, { createContext, useCallback, useEffect } from "react";
import { Answer, ForumContextType, Question } from "@/types/ForumTypes";
import { forumService } from "@/services";
import { useSession } from "next-auth/react";

const ForumContext = createContext<ForumContextType | null>(null);
const { Provider } = ForumContext;

const ForumProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | undefined>();
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = React.useState<
    string | undefined
  >();
  const [labId, setLabId] = React.useState<string | undefined>();
  const { data: session, status } = useSession();

  // fetch forum fuctnion
  const fetchForum = useCallback(async () => {
    if (status === "loading") return; // Do nothing while loading
    if (session?.user.token === undefined) return;
    if (labId === undefined) return;
    try {
      setIsLoading(true);
      const response = await forumService(session.user.token).getForum(labId);
      setQuestions(response);
      setIsLoading(false);
      setError(undefined);
    } catch (err: any) {
      console.log(err.message);
      setIsLoading(false);
      setError(err.message);
    }
  }, [session, status, labId]);

  // fetch forum on mount
  useEffect(() => {
    fetchForum();
  }, [fetchForum]);

  if (status === "loading") return <>loading</>;

  const refreshForum = fetchForum; //TODO: for refresh button

  const addQuestion = async (question: {
    title: string;
    description: string;
  }) => {
    if (session?.user.token === undefined) return;
    if (labId === undefined) return;
    try {
      setIsLoading(true);
      const response = await forumService(session.user.token).addQuestion(
        labId,
        question
      );
      setQuestions((prev) => [...prev, response]);
      setIsLoading(false);
      setError(undefined);
    } catch (err: any) {
      console.log(err.message);
      setIsLoading(false);
      setError(err.message);
    }
  };

  const postAnswer = async (
    questionId: string,
    answer: { description: string }
  ) => {
    if (session?.user.token === undefined) return;
    try {
      const response = await forumService(session.user.token).postAnswer(
        questionId,
        answer
      );
      setQuestions((prev) =>
        prev.map((question) => {
          if (question._id === questionId) {
            return { ...question, answers: [...question.answers, response] };
          }
          return question;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuestion = async (questionId: string) => {
    if (session?.user.token === undefined) return;
    try {
      await forumService(session.user.token).deleteQuestion(questionId);
      setQuestions((prev) =>
        prev.filter((question) => question._id !== questionId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAnswer = async (questionId: string, answerId: string) => {
    if (session?.user.token === undefined) return;
    try {
      await forumService(session.user.token).deleteAnswer(questionId, answerId);
      setQuestions((prev) =>
        prev.map((question) => {
          if (question._id === questionId) {
            return {
              ...question,
              answers: question.answers.filter(
                (answer) => answer._id !== answerId
              ),
            };
          }
          return question;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuestion = async (
    questionId: string,
    question: {
      title: string;
      description: string;
    }
  ) => {
    if (session?.user.token === undefined) return;
    try {
      const response = await forumService(session.user.token).updateQuestion(
        questionId,
        question
      );
      setQuestions((prev) =>
        prev.map((q) => {
          if (q._id === response._id) {
            return response;
          }
          return q;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateAnswer = async (
    questionId: string,
    answerId: string,
    answer: {
      description: string;
    }
  ) => {
    if (session?.user.token === undefined) return;
    try {
      const response = await forumService(session.user.token).updateAnswer(
        answerId,
        answer
      );
      setQuestions((prev) =>
        prev.map((question) => {
          if (question._id === questionId) {
            return {
              ...question,
              answers: question.answers.map((a) => {
                if (a._id === response._id) {
                  return response;
                }
                return a;
              }),
            };
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
        isLoading,
        error,
        questions,
        selectedQuestionId,
        setSelectedQuestionId,
        setLabId,
        addQuestion,
        postAnswer,
        deleteQuestion,
        deleteAnswer,
        updateQuestion,
        updateAnswer,
      }}
    >
      {children}
    </Provider>
  );
};

export { ForumProvider, ForumContext };
