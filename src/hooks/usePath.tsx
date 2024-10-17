import { useEffect, useState } from "react";

export function usePath() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("navigate", handlePathChange);
    window.addEventListener("popstate", handlePathChange);

    return () => {
      window.removeEventListener("navigate", handlePathChange);
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  return currentPath;
}
