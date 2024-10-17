import React from "react";
import { usePath } from "../hooks/usePath";
import { matchPath } from "./utils";

type ComponentProps = Readonly<{
  params: { [key: string]: string };
}>;

type Props = Readonly<{
  path?: string;
  exact?: boolean;
  component: React.FC<ComponentProps>;
}>;

export default function Route(props: Props) {
  const { path, component: Component, exact } = props;
  const currentPath = usePath();

  const { matched, params } = matchPath(currentPath, { path, exact });

  if (!matched || !Component) return null;

  return <Component params={params || {}} />;
}
