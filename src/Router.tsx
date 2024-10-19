import Route from "./lib/Route";

import HomePage from "./components/Home/Home";
import StartQuiz from "./components/Quiz/StartQuiz";
import CheckQuizCompletion from "./components/Quiz/FinishQuiz";
import NotFound from "./components/NotFound";

export default function Router() {
  return (
    <>
      <Route exact={true} path="/" component={HomePage} />
      <Route path="/completion" component={CheckQuizCompletion} />
      <Route path="/quiz/:question" component={StartQuiz} />
      <Route path="/not-found" component={NotFound} />
    </>
  );
}
