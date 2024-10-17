// Optimize: Add path caching with Map
function parsePath(path: string) {
  const paramNames: string[] = [];
  const normalizedPath = path.replace(/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "([^/]+)";
  });
  return { normalizedPath, paramNames };
}

function getParams(match: RegExpMatchArray, paramNames: string[]) {
  const params: { [key: string]: string } = {};
  paramNames.forEach((paramName, index) => {
    params[paramName] = match[index + 1];
  });
  return params;
}

export function matchPath(
  pathname: string,
  options: {
    path?: string;
    exact?: boolean;
  }
): {
  matched: boolean;
  params?: { [key: string]: string };
} {
  const { exact = false, path } = options;

  if (!path) {
    return {
      matched: true,
    };
  }

  const { normalizedPath, paramNames } = parsePath(path);

  const match = new RegExp(`^${normalizedPath}$`).exec(pathname);

  if (!match) {
    return { matched: false };
  }

  const url = match[0];
  const isExact = pathname === url;

  if (exact && !isExact) {
    return { matched: false };
  }

  const params = paramNames.length ? getParams(match, paramNames) : undefined;

  return {
    matched: true,
    params,
  };
}
