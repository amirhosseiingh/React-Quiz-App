import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { QuizContext } from '../../contexts/QuizContext';
import { getCategoryData, getQuizData } from '../../apis/get';

interface Category {
  id: number;
  name: string;
}

const QuizSetup: React.FC = () => {
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
      .catch((err) => console.error('Error fetching categories:', err));
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
      console.error('Error fetching questions:', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Quiz Setup</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Number of Questions */}
          <div>
            <label className="block text-gray-700">Number of Questions</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min="5"
              max="50"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
            />
            {errors.count && <p className="mt-1 text-sm text-red-500">{errors.count}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-gray-700">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && <p className="mt-1 text-sm text-red-500">{errors.difficulty}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-purple-500 p-3 text-white font-semibold shadow-md transition-all duration-200 hover:bg-purple-600 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizSetup;
