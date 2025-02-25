import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
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
  const [categories, setCategories ] = useState<Category[]>([]);
  const [count, setCount] = useState<number>(5);
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty ] = useState<string>('');
  const [loading,  setLoading ] = useState(false);
  const [errors, setErrors] = useState<{ count?: string; category?: string; difficulty?: string }>({});

  useEffect(() => {
    getCategoryData()
      .then(setCategories)
      .catch((error) => console.log(error));

  }, []);

  // validation form
  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (count < 5 || count > 50) newErrors.count = 'Please enter a number between 5 and 50';
    if (!category) newErrors.category = 'Please select a category';
    if (!difficulty) newErrors.difficulty = 'Please select a difficulty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm() || !quizContext) return;

    setLoading(true);

    try {
      const questions = await getQuizData(count, category, difficulty);

      quizContext.dispatch({ type: 'SET_QUESTIONS', payload: questions });
      navigate('/questions');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Quiz Setup</h2>
        <form  className="space-y-5">
          <div>
            <label className="block text-gray-700">Number of Questions</label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min={5}
              max={50}
              className="mt-1 w-full"
            />
            {errors.count && <p className="mt-1 text-sm text-red-500">{errors.count}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
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

          <Button
            onClick={handleSubmit}
            className={`w-full bg-purple-500 text-white font-semibold shadow-md ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 
            'Start Quiz'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizSetup;
