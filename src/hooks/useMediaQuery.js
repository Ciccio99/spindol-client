import { useState, useLayoutEffect } from 'react';

export default function useMediaQuery(query) {
  const media = window.matchMedia(`(max-width: ${query}px)`);
  const [matches, setMatches] = useState(media.matches);

  useLayoutEffect(() => {
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query, media]);

  return matches;
}
