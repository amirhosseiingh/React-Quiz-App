import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: string[];
}

interface QuizAction {
  type: 'SET_QUESTIONS' | 'SET_USER_ANSWER' | 'NEXT_QUESTION';
  payload?: any;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, currentQuestionIndex: 0 };
    case 'SET_USER_ANSWER':
      const updatedAnswers = [...state.userAnswers];
      updatedAnswers[state.currentQuestionIndex] = action.payload;
      return { ...state, userAnswers: updatedAnswers };
    case 'NEXT_QUESTION':
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    default:
      return state;
  }
};

interface QuizContextProps {
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}

export const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
