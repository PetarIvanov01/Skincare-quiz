export default function PaginationDot(props: { selected?: boolean }) {
  return (
    <span
      style={{
        display: "block",
        cursor: "pointer",
        width: "10px",
        height: "10px",
        backgroundColor: props.selected ? "#5BC1ED" : "#E3E3E3",
        scale: props.selected ? "1.3" : "1",
        borderRadius: "50%",
        transition: "background-color 0.3s ease",
      }}
    />
  );
}
