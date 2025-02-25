import  { createContext, useReducer, ReactNode, Dispatch } from 'react';
import quizReducer, { QuizState, QuizAction } from '../reducers/QuizReducer';

interface QuizContextProps {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}

export const QuizContext = createContext<QuizContextProps | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [state, dispatch] = useReducer(quizReducer, {
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
  });
  // sent value to quiz context
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
