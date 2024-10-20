type IconButtonProps = {
  position: "left" | "right";
  onClick: () => void;
  icon: React.ReactNode;
  topOffset?: string;
  color?: string;
  size?: string;
  positionOffSet?: string;
};

export default function IconButton({
  position,
  onClick,
  icon,
  topOffset = "50%",
  color = "#f6f6f6",
  size = "60px",
  positionOffSet = "90px",
}: IconButtonProps) {
  const isLeft = position === "left";

  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: topOffset,
        left: isLeft ? `-${positionOffSet}` : undefined,
        right: !isLeft ? `-${positionOffSet}` : undefined,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: color,
        transform: "translateY(-50%)",
        border: "none",
        cursor: "pointer",
      }}
    >
      {icon}
    </button>
  );
}
