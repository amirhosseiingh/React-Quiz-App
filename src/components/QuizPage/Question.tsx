import React, { useContext, useState } from "react";
import { QuizContext } from "../../contexts/QuizContext";

const Question = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("Question must be used within a QuizProvider");
  }
  const { state, dispatch } = context;
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (state.questions.length === 0) {
    return <div className="text-center text-white text-xl">Loading...</div>;
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setFeedback(answer === currentQuestion.correct_answer ? "Correct!" : "Incorrect.");
  };

  const handleNextClick = () => {
    dispatch({ type: "NEXT_QUESTION" });
    setSelectedAnswer(null);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="max-w-lg w-full bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{currentQuestion.question}</h2>
        <div className="space-y-2">
          {allAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              disabled={selectedAnswer !== null}
              className={`w-full py-2 px-4 rounded-lg text-white transition-all 
                ${selectedAnswer === null ? "bg-gray-500 hover:bg-gray-700" : 
                answer === currentQuestion.correct_answer ? "bg-green-500" : 
                selectedAnswer === answer ? "bg-red-500" : "bg-gray-400"}`}
            >
              {answer}
            </button>
          ))}
        </div>
        {feedback && <div className="mt-4 text-lg font-semibold text-center">{feedback}</div>}
        {selectedAnswer && (
          <button
            onClick={handleNextClick}
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
