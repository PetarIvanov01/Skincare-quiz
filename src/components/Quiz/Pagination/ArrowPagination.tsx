import IconButton from "./components/IconButton";

import ArrowNextSvgIcon from "./components/ArrowNextSvgIcon";
import ArrowPrevSvgIcon from "./components/ArrowPrevSvgIcon";

type Props = Readonly<{
  handleNextClick: () => void;
  handlePrevClick: () => void;
}>;

export default function ArrowPagination({
  handleNextClick,
  handlePrevClick,
}: Props) {
  return (
    <>
      <IconButton
        onClick={handlePrevClick}
        position="left"
        icon={<ArrowPrevSvgIcon />}
      />

      <IconButton
        onClick={handleNextClick}
        position="right"
        icon={<ArrowNextSvgIcon />}
      />
    </>
  );
}
