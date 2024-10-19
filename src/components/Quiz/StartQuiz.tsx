import questions from "@/assets/questions";

import QuizPage from "@/pages/QuizInGame/QuizInGame";

export default function StartQuiz(props: {
  params: {
    [key: string]: string;
  };
}) {
  return <QuizPage questions={questions} params={{ ...props.params }} />;
}
