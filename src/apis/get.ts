import { BASE_URL_QUIZ } from './const';
import { BASE_URL_CATEGORY } from './const';

export const getQuizData = async (count, category, difficulty) => {
  const data = await fetch(
    `${BASE_URL_QUIZ}?amount=${count}&category=${category}&difficulty=${difficulty}`
  );
  const res = await data.json()
  return res.results;
};



export const getCategoryData = async () => {
    const data = await fetch(BASE_URL_CATEGORY);
    const res = await data.json()
    return res.trivia_categories

    
}