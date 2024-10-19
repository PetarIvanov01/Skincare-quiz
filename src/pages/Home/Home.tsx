import styles from "./Home.module.css";
import { SESSION_STORAGE_KEYS } from "@/storageKeys";

import { useEffect } from "react";

import Link from "@/lib/Link";

export default function HomePage() {
  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.QUIZ_ANSWERS, "{}");
    sessionStorage.setItem(SESSION_STORAGE_KEYS.WISHLIST, "{}");
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>Build a self care routine suitable for you</h1>
          <p>
            Take out test to get a personalised self care routine based on your
            needs.
          </p>
        </div>
        <Link to="/quiz/1" className={styles.button}>
          Start the quiz
        </Link>
      </div>
    </main>
  );
}
