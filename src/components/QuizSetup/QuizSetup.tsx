import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { QuizContext } from '../../contexts/QuizContext';
import { getCategoryData, getQuizData } from '../../apis/get';
import Button from '../../base/button';
import Input from '../../base/input';

interface Category {
  id: number;
  name: string;
}

const QuizSetup = () => {
  const navigate = useNavigate();
  const quizContext = useContext(QuizContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [count, setCount] = useState<number>(5);
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ count?: string; category?: string; difficulty?: string }>({});

  useEffect(() => {
    getCategoryData()
      .then(setCategories)
      .catch((error) => console.error(error));
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (count < 5 || count > 50) newErrors.count = 'Enter a number between 5 and 50';
    if (!category) newErrors.category = 'Select a category';
    if (!difficulty) newErrors.difficulty = 'Select a difficulty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !quizContext) return;

    setLoading(true);

    try {
      const questions = await getQuizData(count, category, difficulty);
      quizContext.dispatch({ type: 'SET_QUESTIONS', payload: questions });
      navigate('/questions');
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-300 to-purple-500 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-2xl bg-white/40 backdrop-blur-md p-6 shadow-xl"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-white drop-shadow-lg">Quiz Setup</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Number of Questions */}
          <div>
            <label className="block text-white">Number of Questions</label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min={5}
              max={50}
              className="mt-1 w-full rounded-lg bg-white/70 text-gray-900 p-3 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
            />
            {errors.count && <p className="mt-1 text-sm text-red-500">{errors.count}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-white">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/70 text-gray-900 p-3 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-white">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1 w-full rounded-lg bg-white/70 text-gray-900 p-3 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && <p className="mt-1 text-sm text-red-500">{errors.difficulty}</p>}
          </div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={handleSubmit}
              className={`w-full bg-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Start Quiz'}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default QuizSetup;
