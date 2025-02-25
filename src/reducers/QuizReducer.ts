// type for question
export interface Question {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }
// type for all the quiz
  export interface QuizState {
    questions: Question[];
    currentQuestionIndex: number;
    userAnswers: string[];
    score: number;
  }
// type for manager quiz 
  export interface QuizAction {
    type: 'SET_QUESTIONS' | 'SET_USER_ANSWER' | 'NEXT_QUESTION' | 'CALCULATE_SCORE';
    payload?: any;
  }
  
  const initialState: QuizState = {
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    score: 0,
  };
  
  const quizReducer = (state: QuizState = initialState, action: QuizAction): QuizState => {
    switch (action.type) {
      case 'SET_QUESTIONS':
        return { ...state, questions: action.payload, currentQuestionIndex: 0, userAnswers: [], score: 0 };
      case 'SET_USER_ANSWER':
        const updatedAnswers = [...state.userAnswers];
        updatedAnswers[state.currentQuestionIndex] = action.payload;
        return { ...state, userAnswers: updatedAnswers };

      case 'NEXT_QUESTION':
        return { ...state, currentQuestionIndex:  state.currentQuestionIndex + 1 };
      case 'CALCULATE_SCORE':
        const correctAnswersCount = state.questions.reduce((count,  question, index)    => {

          if (question.correct_answer === state.userAnswers [index]) {

            count++;
          }
          return count;
        },
         0);
        const score = (correctAnswersCount / state.questions.length) * 100;
        
        return { ...state, score: score };
      default:
        return state;
    }
  };
  
  export default quizReducer;
  