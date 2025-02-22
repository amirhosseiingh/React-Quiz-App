import { Route, Routes } from 'react-router';
import WelcomePage from '../components/Welcome/WelcomePage';
import QuizSetup from '../components/QuizSetup/QuizSetup';
import Question from '../components/QuizPage/Question';
import QuizResults from '../components/QuizResult/QuizResult';

const AppRouter = () => {
  return (

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/setup" element={<QuizSetup />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/results" element={<QuizResults />} />
      </Routes>

  );
};

export default AppRouter;
