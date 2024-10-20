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

// Can be Optimized: Use cache for a certain time
function getMatchScore(product: FetchProducts, userInputs: UserInputs): number {
  let score = 0;

  if (product.title.toLowerCase().includes(userInputs.hairType.toLowerCase())) {
    score += 3;
  }
  if (
    product.tags.some((tag) =>
      tag.toLowerCase().includes(userInputs.hairType.toLowerCase())
    )
  ) {
    score += 3;
  }

  if (
    product.body_html.toLowerCase().includes(userInputs.benefit.toLowerCase())
  ) {
    score += 2;
  }
  if (
    product.tags.some((tag) =>
      tag.toLowerCase().includes(userInputs.benefit.toLowerCase())
    )
  ) {
    score += 2;
  }

  if (
    product.tags.some((tag) =>
      tag.toLowerCase().includes(userInputs.concern.toLowerCase())
    )
  ) {
    score += 1;
  }

  return score;
}

export function getRecommendedProducts(
  products: FetchProducts[],
  userInputs: UserInputs
) {
  const wishlist = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEYS.WISHLIST) || "{}"
  );

  let scoredProducts = products
    .map((product) => ({
      ...product,
      matchScore: getMatchScore(product, userInputs),
    }))
    .filter((product) => product.matchScore > 0);

  const selectedProductIds = new Set(scoredProducts.map((p) => p.id));

  if (scoredProducts.length < 9) {
    const fallbackProducts = products
      .slice(0, 20)
      .filter((product) => !selectedProductIds.has(product.id));

    scoredProducts = scoredProducts.concat(
      fallbackProducts.slice(
        0,
        9 - scoredProducts.length
      ) as typeof scoredProducts
    );
  }

  scoredProducts.sort((a, b) => {
    const aInWishlist = Boolean(wishlist[a.id]);
    const bInWishlist = Boolean(wishlist[b.id]);

    if (aInWishlist && !bInWishlist) return -1;
    if (!aInWishlist && bInWishlist) return 1;

    return b.matchScore - a.matchScore;
  });

  return scoredProducts.map((product) => ({
    id: product.id,
    image: product.images[0].src,
    title: product.title,
    description: trimText(stripHtml(product.body_html).result),
    price: product.variants[0].price,
  }));
}
