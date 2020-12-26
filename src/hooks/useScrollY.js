import { useEffect, useState } from 'react';

const useScrollY = (scrollThreshold) => {
  const [isScrolled, setIsScrolled] = useState(window.pageYOffset >= scrollThreshold);

  useEffect(() => {
    const checkScrollThreshold = () => {
      if (window.pageYOffset >= scrollThreshold && !isScrolled) {
        setIsScrolled(true);
      } else if (window.pageYOffset < scrollThreshold && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', checkScrollThreshold);
    return () => window.removeEventListener('scroll', checkScrollThreshold);
  });

  return { isScrolled };
};

export default useScrollY;
