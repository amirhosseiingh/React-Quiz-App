import React from "react";
import { QuizProvider } from "../../contexts/QuizContext";
import Question from "./Question";

const QuizPage = () => {
  return (
    <QuizProvider>
      <Question />
    </QuizProvider>
  );
};

export default QuizPage;
