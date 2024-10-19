import { stripHtml } from "string-strip-html";
import type { UserInputs } from "./transformAnswersToUserInputs";

export interface FetchProducts {
  id: number;
  title: string;
  body_html: "string";
  tags: string[];
  images: { src: string }[];
  variants: { price: string }[];
}

export function filterProducts(
  products: FetchProducts[],
  userInputs: UserInputs
) {
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
      description: stripHtml(e.body_html).result,
      price: e.variants[0].price,
    }));
}
