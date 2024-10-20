import { useState, useEffect, useCallback } from "react";

export default function useProductCarousel(productsLength: number) {
  const [productIndex, setProductIndex] = useState(0);
  const [productsPerSlide, setProductsPerSlide] = useState<number>(1);
  console.log(productsPerSlide);

  useEffect(() => {
    const handleSlidesChange = () => {
      const carousel = document.getElementById("carousel");
      let visibleItemsLength = 0;
      for (const child of carousel?.children || []) {
        const position = child.getBoundingClientRect();
        if (window.innerWidth > position.right && visibleItemsLength < 3) {
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

  const showNextImage = useCallback(() => {
    setProductIndex((index) => {
      if (
        productsLength % 2 === 0
          ? productsLength - productsPerSlide - 1 < index
          : productsLength - productsPerSlide <= index
      ) {
        return 0;
      }
      return index + 1;
    });
  }, [productsPerSlide, productsLength]);

  const showPrevImage = useCallback(() => {
    setProductIndex((index) => {
      if (productsLength <= productsPerSlide) {
        return 0;
      }
      if (index === 0)
        return productsLength % 2 === 0
          ? productsLength - productsPerSlide
          : productsLength - 1;

      return index - 1;
    });
  }, [productsPerSlide, productsLength]);

  const handleDotNavigation = (groupIndex: number) => {
    setProductIndex(groupIndex * productsPerSlide);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Can be Optimized: Use debaunce
      if (event.key === "ArrowRight") {
        showNextImage();
      } else if (event.key === "ArrowLeft") {
        showPrevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showNextImage, showPrevImage]);

  return {
    productIndex,
    productsPerSlide,
    showNextImage,
    showPrevImage,
    handleDotNavigation,
  };
}
