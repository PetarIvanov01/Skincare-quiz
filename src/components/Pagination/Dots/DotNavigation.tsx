import PaginationDot from "./PaginationDot";

type Props = Readonly<{
  productsLength: number;
  index: number;
  productsPerSlide: number;
  handleDotNavigation: (groupIndex: number) => void;
}>;

export default function DotNavigation(props: Props) {
  const { index, productsPerSlide, productsLength, handleDotNavigation } =
    props;

  const totalDots = Math.ceil(productsLength / productsPerSlide);

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {Array.from({ length: totalDots }).map((_, i) => {
        return (
          <div key={i} onClick={() => handleDotNavigation(i)}>
            <PaginationDot
              selected={i === Math.floor(index / productsPerSlide)}
            />
          </div>
        );
      })}
    </div>
  );
}
