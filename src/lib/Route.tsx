import React from "react";

import { matchPath } from "./utils";

import { usePath } from "@/hooks/usePath";

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
