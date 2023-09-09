export interface Question {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  answers: Answer[];
}

export interface Answer {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface Author {
  _id: string;
  firstName: string;
  lastName: string;
}
export interface ForumContextType {
  isLoading: boolean;
  error: string | undefined;
  setLabId: React.Dispatch<React.SetStateAction<string | undefined>>;
  questions: Question[];
  selectedQuestionId: string | undefined;
  setSelectedQuestionId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  addQuestion: (question: {
    title: string;
    description: string;
  }) => Promise<void>;
  postAnswer: (
    questionId: string,
    answer: { description: string }
  ) => Promise<void>;
  deleteQuestion: (questionId: string) => Promise<void>;
  deleteAnswer: (questionId: string, answerId: string) => Promise<void>;
  updateQuestion: (
    questionId: string,
    question: { title: string; description: string }
  ) => Promise<void>;
  updateAnswer: (
    questionId: string,
    answerId: string,
    answer: { description: string }
  ) => Promise<void>;
}
