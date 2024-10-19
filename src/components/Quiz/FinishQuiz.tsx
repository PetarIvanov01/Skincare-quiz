import questions from "@/assets/questions";
import { SESSION_STORAGE_KEYS } from "@/storageKeys";
import { transformAnswersToUserInputs } from "@/utils/transformAnswersToUserInputs";

import QuizCompletePage from "@/pages/QuizComplete/QuizCompletePage";
import InCompleteQuiz from "@/pages/QuizInComplete/QuizInComplete";

export default function FinishQuiz() {
  const storedAnswers = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEYS.QUIZ_ANSWERS) || "{}"
  );

  const totalQuestions = questions.length;
  const completed = Object.keys(storedAnswers).length;

  if (totalQuestions !== completed) {
    return (
      <InCompleteQuiz
        totalQuestions={totalQuestions}
        currentAnswers={storedAnswers}
      />
    );
  }

  const userInputs = transformAnswersToUserInputs(storedAnswers);
  return <QuizCompletePage userInputs={userInputs} />;
}
