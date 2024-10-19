import useRouter from "@/hooks/useRouter.tsx";
import useQuiz from "@/hooks/useQuiz.tsx";

import { QuestionsType } from "@/assets/questions.ts";

import QuizUI from "./QuizInGameUI";

type Props = Readonly<{
  params: { [key: string]: string };
  questions: QuestionsType;
}>;

export default function QuizInGame({ params, questions }: Props) {
  const { navigate } = useRouter();
  const questionId = parseInt(params.question, 10);
  const questionsLength = questions.length;
  const question = questions.find((q) => q.id === questionId);

  const {
    selectedOption,
    handleOptionClick,
    handleNextClick,
    handleBackClick,
    handleFinishQuiz,
  } = useQuiz(questionId, questionsLength);

  if (!question) {
    navigate("/not-found");
    return;
  }

  return (
    <QuizUI
      selectedId={selectedOption}
      questionsLength={questionsLength}
      question={question}
      handleBackClick={handleBackClick}
      handleNextClick={handleNextClick}
      handleFinishQuiz={handleFinishQuiz}
      handleOptionClick={handleOptionClick}
    />
  );
}
