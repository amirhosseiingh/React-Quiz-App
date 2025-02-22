import  { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { QuizContext } from '../../contexts/QuizContext';
import { motion } from 'framer-motion';

const QuizResults = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('QuizResults must be used within a QuizProvider');
  }
  const { state, dispatch } = context;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'CALCULATE_SCORE' });
  }, [dispatch]);

  const reactionMessage = (score: number) => {
    if (score < 60 ) {
      
      return { message: 'Better luck next time! 😒', className: 'text-red-500 font-bold' };
    } else if (score >= 60 && score < 80) {
      return { message: 'Good job! 🤔', className: 'text-yellow-500 font-bold' };
    } else {
      return { message: 'Excellent work! 😘', className: 'text-green-500 font-bold' };
    }
  };

  const reaction = reactionMessage( state.score);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 to-purple-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-lg rounded-2xl bg-slate-600 p-6 shadow-xl"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 text-center text-3xl font-bold text-gray-300 text-">
          Quiz Results
        </motion.h2>

        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
          className={`mb-6 text-center text-lg ${reaction.className}`
        }
        >
          Your Score: <span className="font-bold text-yellow-500">{state.score} From 100</span>
          <br />
          {reaction.message}
        </motion.p>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>  navigate('/') }
            className="w-full rounded-lg bg-gray-400 p-3 text-slate-100 font-semibold shadow-md  hover:bg-slate-300 hover:text-slate-800"
          >
            Return to Home
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>   navigate('/setup')  }
            className="w-full rounded-lg bg-gray-400 p-3 text-slate-100 font-semibold shadow-md   hover:bg-slate-300 hover:text-slate-800"
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizResults;
