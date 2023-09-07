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
  setLabId: React.Dispatch<React.SetStateAction<string | undefined>>;
  questions: Question[];
  // setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  selectedQuestion: string | undefined;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<string | undefined>>;
  postQuestion: (question: Question) => Promise<void>;
  postAnswer: (id: string, answer: Answer) => Promise<void>;
}
