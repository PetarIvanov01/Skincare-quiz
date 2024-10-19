import { useState, useEffect } from "react";

export default function useProductCarousel(productsLength: number) {
  const [productIndex, setProductIndex] = useState(0);
  const [productsPerSlide, setProductsPerSlide] = useState<number>(1);

  useEffect(() => {
    const handleSlidesChange = () => {
      const carousel = document.getElementById("carousel");
      let visibleItemsLength = 0;
      for (const child of carousel?.children || []) {
        const position = child.getBoundingClientRect();
        if (window.innerWidth > position.right && visibleItemsLength <= 3) {
          visibleItemsLength++;
        }
      }
      setProductIndex(0);
      setProductsPerSlide(visibleItemsLength);
    };

    handleSlidesChange();

    window.addEventListener("resize", handleSlidesChange);
    return () => window.removeEventListener("resize", handleSlidesChange);
  }, [productsLength]);

  const showNextImage = () => {
    setProductIndex((index) => {
      if (index === productsLength - 1) return 0;
      if (productsLength - productsPerSlide < index) return 0;
      return index + 1;
    });
  };

  const showPrevImage = () => {
    setProductIndex((index) => {
      if (index === 0)
        return productsLength % 2 === 0
          ? productsLength - 1
          : productsLength - 2;

      return index - 1;
    });
  };

  const handleDotNavigation = (groupIndex: number) => {
    setProductIndex(groupIndex * productsPerSlide);
  };

  return {
    productIndex,
    productsPerSlide,
    showNextImage,
    showPrevImage,
    handleDotNavigation,
  };
}
