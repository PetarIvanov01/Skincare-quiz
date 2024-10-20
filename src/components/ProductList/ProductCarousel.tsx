import { useState } from "react";

import { SESSION_STORAGE_KEYS } from "@/storageKeys.ts";

import ProductCard from "../ProductCard/ProductCard";

export default function ProductCarousel(props: {
  suggestedProducts: {
    id: number;
    image: string;
    title: string;
    description: string;
    price: string;
  }[];
  productIndex: number;
}) {
  const { productIndex, suggestedProducts } = props;

  const [wishlist, setToWishlist] = useState(() => {
    return JSON.parse(
      sessionStorage.getItem(SESSION_STORAGE_KEYS.WISHLIST) || "{}"
    ) as Record<string, boolean>;
  });

  const handleWishlist = (id: number) => {
    setToWishlist((prev) => {
      const updatedWishlist = { ...wishlist, [id]: !prev[id] };

      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.WISHLIST,
        JSON.stringify(updatedWishlist)
      );

      return updatedWishlist;
    });
  };

  return suggestedProducts.map((product) => (
    <ProductCard
      isLiked={wishlist[product.id]}
      key={product.title}
      translate={`${-110 * productIndex}%`}
      id={product.id}
      image={product.image}
      title={product.title}
      description={product.description}
      price={product.price}
      handleWishlist={handleWishlist}
    />
  ));
}
