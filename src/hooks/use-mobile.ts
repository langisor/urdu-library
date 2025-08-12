import * as React from "react"

// --- Custom useMediaQuery hook from your provided file ---
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);
  return matches;
};
