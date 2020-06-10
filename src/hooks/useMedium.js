import { useEffect, useState } from 'react';

const useMedium = () => {
  const [isMedium, setIsMedium] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 900 && !isMedium) {
        setIsMedium(true);
      } else if (window.innerWidth > 900 && isMedium) {
        setIsMedium(false);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  return { isMedium };
};

export default useMedium;
