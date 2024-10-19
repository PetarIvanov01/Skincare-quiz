import { useState, useEffect } from "react";
import useRouter from "./useRouter.tsx";

export default function useQuiz(questionId: number, questionsLength: number) {
  const { navigate } = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    const storedAnswers = JSON.parse(
      sessionStorage.getItem("quizAnswers") || "{}"
    );
    if (storedAnswers[questionId] !== undefined) {
      setSelectedOption(storedAnswers[questionId]);
    }
  }, [questionId]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);

    const storedAnswers = JSON.parse(
      sessionStorage.getItem("quizAnswers") || "{}"
    );
    storedAnswers[questionId] = option;
    sessionStorage.setItem("quizAnswers", JSON.stringify(storedAnswers));
  };

  const handleNextClick = () => {
    if (questionId < questionsLength) {
      navigate(`/quiz/${questionId + 1}`);
    }
  };

  const handleBackClick = () => {
    if (questionId > 1) {
      navigate(`/quiz/${questionId - 1}`);
    } else {
      if (window.confirm("You will leave the quiz!")) {
        navigate("/");
      }
    }
  };

  const handleFinishQuiz = () => {
    navigate("/completion");
  };
  return {
    selectedOption,
    handleOptionClick,
    handleNextClick,
    handleBackClick,
    handleFinishQuiz,
  };
}
