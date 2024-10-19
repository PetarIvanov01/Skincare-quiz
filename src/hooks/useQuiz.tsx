import { useState, useEffect } from "react";
import { SESSION_STORAGE_KEYS } from "@/storageKeys.ts";

import useRouter from "./useRouter.tsx";

export default function useQuiz(questionId: number, questionsLength: number) {
  const { navigate } = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    const storedAnswers = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEYS.QUIZ_ANSWERS) || "{}"
    );
    if (storedAnswers[questionId] !== undefined) {
      setSelectedOption(storedAnswers[questionId]);
    }
  }, [questionId]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);

    const storedAnswers = JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEYS.QUIZ_ANSWERS) || "{}"
    );
    storedAnswers[questionId] = option;
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.QUIZ_ANSWERS,
      JSON.stringify(storedAnswers)
    );
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
      // Can be Optimized: Add modal/react portal
      if (
        window.confirm(
          "Are you sure you want to leave the quiz? Your progress will be lost."
        )
      ) {
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
