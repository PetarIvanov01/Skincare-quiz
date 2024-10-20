import { useEffect, useRef } from "react";

type HandleCloseElement = () => void;

export default function useOutsideClickToggle<RefType extends HTMLElement>(
  handleClose: HandleCloseElement
) {
  const ref = useRef<RefType>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClose]);

  return {
    ref,
  };
}
