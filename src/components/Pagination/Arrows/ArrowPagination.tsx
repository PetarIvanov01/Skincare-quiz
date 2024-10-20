import IconButton from "./IconButton";

import ArrowNextSvgIcon from "@/components/SvgIcons/ArrowNextSvgIcon";
import ArrowPrevSvgIcon from "@/components/SvgIcons/ArrowPrevSvgIcon";

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
