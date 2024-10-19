import styles from "./QuizInComplete.module.css";

import useRouter from "@/hooks/useRouter";

import questions from "@/assets/questions";

type Props = Readonly<{
  totalQuestions: number;
  currentAnswers: Record<string, string>;
}>;

export default function IncompleteQuiz(props: Props) {
  const { navigate } = useRouter();
  const { currentAnswers, totalQuestions } = props;

  const unansweredQuestions: number[] = [];
  for (let i = 1; i <= totalQuestions; i++) {
    if (currentAnswers[i] === undefined) {
      unansweredQuestions.push(i);
    }
  }
  const handleComplete = () => {
    if (unansweredQuestions.length > 0) {
      navigate(`/quiz/${unansweredQuestions[0]}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Incomplete Quiz</h1>
      <p className={styles.description}>
        You haven't answered all the questions. Please complete the following:
      </p>
      <ul className={styles.unansweredList}>
        {unansweredQuestions.map((q) => (
          <li key={q} className={styles.unansweredItem}>
            Question {q}: {questions[q - 1].question}
          </li>
        ))}
      </ul>
      <button
        className={`${styles.continueButton} ${styles.hoverBtn}`}
        onClick={handleComplete}
      >
        Continue Quiz
      </button>
    </div>
  );
}
