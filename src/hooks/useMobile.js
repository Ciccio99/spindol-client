import { useEffect, useState } from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 600 && !isMobile) {
        setIsMobile(true);
        console.log(true);
      } else if (window.innerWidth > 600 && isMobile) {
        setIsMobile(false);
        console.log(false);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  return { isMobile };
};

export default useMobile;
