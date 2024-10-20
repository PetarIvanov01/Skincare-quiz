import styles from "./ProductsFetch.module.css";
import useFetch from "@/hooks/useFetch";

import {
  FetchProducts,
  getRecommendedProducts,
} from "@/utils/getRecommendedProducts";
import { UserInputs } from "@/utils/transformAnswersToUserInputs";

import ProductList from "./ProductList";

type Props = Readonly<{
  userInputs: UserInputs;
}>;
const url = "https://jeval.com.au/collections/hair-care/products.json?limit=50";

export default function ProductsFetch({ userInputs }: Props) {
  const { data, error, isLoading } = useFetch<{ products: FetchProducts[] }>(
    url
  );

  if (error) return null;
  if (!data || isLoading) return <Skeleton />;

  const suggestedProducts = getRecommendedProducts(data.products, userInputs);

  return <ProductList suggestedProducts={suggestedProducts} />;
}

function Skeleton() {
  return <div className={styles.skeletonCard}></div>;
}
