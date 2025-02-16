
import { Route, Routes } from 'react-router';
import WelcomePage from '../components/Welcome/WelcomePage';
import QuizSetup from '../components/QuizSetup/QuizSetup';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/setup" element={<QuizSetup />} />
    </Routes>
  );
};

export default AppRouter;
