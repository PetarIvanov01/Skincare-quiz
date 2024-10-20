import styles from "./ProductCard.module.css";

import { useState } from "react";

import FlipSvgIcon from "../SvgIcons/FlipSvgIcon";
import LikeSvgIcon from "../SvgIcons/LikeSvgIcon";
import useOutsideClickToggle from "@/hooks/useOutsideClickToggle";

type ProductCardProps = {
  isLiked: boolean;
  translate: string;
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  handleWishlist: (id: number) => void;
};

export default function ProductCard({
  isLiked,
  translate,
  id,
  image,
  title,
  description,
  price,
  handleWishlist,
}: ProductCardProps) {
  const [flipCard, setFlipCard] = useState(false);

  const { ref } = useOutsideClickToggle<HTMLDivElement>(handleClose);

  function handleClose() {
    setFlipCard(false);
  }

  const handleFlipping = () => {
    setFlipCard((state) => !state);
  };

  return (
    <div
      style={{ translate }}
      className={`${styles.card} ${flipCard ? styles.rotate : ""}`}
    >
      <div className={styles.front}>
        <section className={styles.cardImageContainer}>
          <img src={image} alt={title} className={styles.cardImage} />
          <LikeSvgIcon
            isLiked={isLiked}
            onClick={() => handleWishlist(id)}
            className={styles.favoriteButton}
          />
          <div ref={ref}>
            <FlipSvgIcon
              onClick={handleFlipping}
              className={styles.flipButton}
            />
          </div>
        </section>
        <section className={styles.titleAndPrice}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardPrice}>${price}</p>
        </section>
      </div>
      <div className={styles.back}>
        <FlipSvgIcon
          style={{
            transform: "rotate(180deg)",
          }}
          onClick={handleFlipping}
          className={styles.flipButton}
        />
        <h2 className={styles.backTitle}>Daily routine</h2>
        <p className={styles.backDescription}>{description}</p>
      </div>
    </div>
  );
}
