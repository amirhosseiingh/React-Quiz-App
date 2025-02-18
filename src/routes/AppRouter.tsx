import { Route, Routes } from 'react-router';
import WelcomePage from '../components/Welcome/WelcomePage';
import QuizSetup from '../components/QuizSetup/QuizSetup';
import Question from '../components/QuizPage/Question'; // اضافه کردن صفحه سوالات

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/setup" element={<QuizSetup />} />
      <Route path="/questions" element={<Question />} /> {/* اضافه کردن مسیر صفحه سوالات */}
    </Routes>
  );
};

export default AppRouter;
