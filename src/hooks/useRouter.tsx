import { useCallback } from "react";

export default function useRouter() {
  const navigate = useCallback((path: string) => {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  return { navigate };
}
