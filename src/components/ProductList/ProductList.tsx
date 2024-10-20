import styles from "./ProductList.module.css";

import useProductCarousel from "@/hooks/useProductCarousel.tsx";

import ProductCarousel from "./ProductCarousel.tsx";
import ArrowPagination from "../Pagination/Arrows/ArrowPagination.tsx";
import DotNavigation from "../Pagination/Dots/DotNavigation.tsx";

type Props = Readonly<{
  suggestedProducts: {
    id: number;
    image: string;
    title: string;
    description: string;
    price: string;
  }[];
}>;

export default function ProductList({ suggestedProducts }: Props) {
  const productsLength = suggestedProducts.length;

  const {
    productIndex,
    productsPerSlide,
    showNextImage,
    showPrevImage,
    handleDotNavigation,
  } = useProductCarousel(productsLength);

  return (
    <div className={styles.productListWrapper}>
      <div className={styles.productListInner}>
        <div id="carousel" className={styles.productCarousel}>
          <ProductCarousel
            suggestedProducts={suggestedProducts}
            productIndex={productIndex}
          />
        </div>

        <ArrowPagination
          handleNextClick={() => showNextImage()}
          handlePrevClick={() => showPrevImage()}
        />
      </div>
      <DotNavigation
        handleDotNavigation={handleDotNavigation}
        productsPerSlide={productsPerSlide || 1}
        productsLength={productsLength}
        index={productIndex}
      />
    </div>
  );
}
