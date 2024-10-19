import styles from "./QuizInGame.module.css";
import { decimalToLetter } from "@/utils/decimalToLetter";

import NextSvgIcon from "@/components/SvgIcons/NextIcon";
import CircularProgressBar from "@/components/CircularProgressBar/CircularProgressBar";

type Props = Readonly<{
  handleFinishQuiz: () => void;
  handleBackClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleNextClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleOptionClick: (id: string) => void;
  questionsLength: number;
  question: {
    id: number;
    question: string;
    options: Array<{ id: string; text: string }>;
  };
  selectedId: string;
}>;

export default function QuizInGameUI({
  questionsLength,
  selectedId,
  question,
  handleBackClick,
  handleNextClick,
  handleOptionClick,
  handleFinishQuiz,
}: Props) {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div style={{ position: "relative" }}>
          <h1 className={styles.questionText}>{question?.question}</h1>
          <CircularProgressBar maxValue={questionsLength} value={question.id} />
        </div>
        <div className={styles.optionsContainer}>
          {question.options.map((option, index) => {
            return (
              <button
                className={`${
                  selectedId === option.id ? styles["option-selected"] : ""
                } ${styles.option}
                `}
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
              >
                {`${decimalToLetter(index)}. ${option.text}`}
              </button>
            );
          })}
        </div>
        <div className={styles.navigationButtons}>
          <button className={styles.backButton} onClick={handleBackClick}>
            Back
          </button>

          {questionsLength > question.id ? (
            <button className={styles.nextButton} onClick={handleNextClick}>
              <span>
                Next question <NextSvgIcon />
              </span>
            </button>
          ) : (
            <button className={styles.nextButton} onClick={handleFinishQuiz}>
              <span>Discover your results</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
