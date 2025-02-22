
import { QuizProvider } from "./contexts/QuizContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <QuizProvider>
      <AppRouter />
    </QuizProvider>
  );
}

export default App;
