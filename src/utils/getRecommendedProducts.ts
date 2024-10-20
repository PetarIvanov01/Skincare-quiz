import { stripHtml } from "string-strip-html";

import type { UserInputs } from "./transformAnswersToUserInputs";

import { SESSION_STORAGE_KEYS } from "@/storageKeys";
import { trimText } from "./trimText";

export interface FetchProducts {
  id: number;
  title: string;
  body_html: "string";
  tags: string[];
  images: { src: string }[];
  variants: { price: string }[];
}

export function getRecommendedProducts(
  products: FetchProducts[],
  userInputs: UserInputs
) {
  const wishlist = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEYS.WISHLIST) || "{}"
  );

  return products
    .filter((product) => {
      return (
        product.title
          .toLowerCase()
          .includes(userInputs.hairType.toLowerCase()) ||
        product.body_html
          .toLowerCase()
          .includes(userInputs.benefit.toLowerCase()) ||
        product.tags.some((tag: string) =>
          tag.toLowerCase().includes(userInputs.concern.toLowerCase())
        ) ||
        product.tags.some((tag: string) =>
          tag.toLowerCase().includes(userInputs.hairType.toLowerCase())
        )
      );
    })
    .map((e) => ({
      id: e.id,
      image: e.images[0].src,
      title: e.title,
      description: trimText(stripHtml(e.body_html).result),
      price: e.variants[0].price,
    }))
    .sort((a, b) => {
      const aInWishlist = Boolean(wishlist[a.id]);
      const bInWishlist = Boolean(wishlist[b.id]);

      if (aInWishlist && !bInWishlist) {
        return -1;
      }
      if (!aInWishlist && bInWishlist) {
        return 1;
      }
      return 0;
    });
}
