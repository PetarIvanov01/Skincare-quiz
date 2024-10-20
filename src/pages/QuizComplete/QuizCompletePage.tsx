import styles from "./QuizCompletePage.module.css";

import { SESSION_STORAGE_KEYS } from "@/storageKeys";
import type { UserInputs } from "@/utils/transformAnswersToUserInputs";

import Link from "@/lib/Link";

import ProductsFetch from "@/components/ProductList/ProductsFetch";

type Props = Readonly<{
  userInputs: UserInputs;
}>;

export default function QuizCompletePage({ userInputs }: Props) {
  const handleQuizRetake = () => {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.QUIZ_ANSWERS, "{}");
    sessionStorage.setItem(SESSION_STORAGE_KEYS.WISHLIST, "{}");
  };

  return (
    <main className={styles.main}>
      <div className={styles["bg-image-container"]}>
        <section className={styles.container}>
          <header className={styles.heading}>
            <h1>Build your everyday self care routine</h1>
            <p>
              Perfect for if you're looking for soft, nourished skin, our
              moisturizing body washes are made with skin-natural nutrients that
              work with your skin to replenish moisture. With a light formula,
              the bubbly lather leaves your skin feeling cleansed and cared for.
              And by choosing relaxing fragrances you can add a moment of calm
              to the end of your day.
            </p>
          </header>

          <Link
            onClick={handleQuizRetake}
            className={styles.button}
            to="/quiz/1"
          >
            Retake the quiz
          </Link>
        </section>
      </div>
      <ProductsFetch userInputs={userInputs} />
    </main>
  );
}
