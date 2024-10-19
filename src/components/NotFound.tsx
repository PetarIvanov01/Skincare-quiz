export default function NotFound() {
  const styles = {
    container: {
      textAlign: "center" as const,
      padding: "50px",
    },
    heading: {
      fontSize: "3rem",
      color: "#ff4040",
    },
    paragraph: {
      fontSize: "1.5rem",
      color: "#666",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.paragraph}>
        Sorry, the page you're looking for does not exist.
      </p>
    </div>
  );
}
