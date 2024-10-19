import styles from "./CircularProgressBar.module.css";

type CircularProgressBarProps = {
  value: number;
  maxValue: number;
};

export default function CircularProgressBar({
  value,
  maxValue,
}: CircularProgressBarProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / maxValue) * circumference;

  return (
    <div className={styles["progress-container"]}>
      <svg className={styles["progress-circle"]} width="120" height="120">
        <circle
          className={styles["progress-circle-background"]}
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="5"
        />
        <circle
          className={styles["progress-circle-foreground"]}
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </svg>
      <div className={styles["progress-text"]}>{`${value}/${maxValue}`}</div>
    </div>
  );
}
