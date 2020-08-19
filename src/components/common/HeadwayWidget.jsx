import React, { useEffect } from 'react';

const CONFIG = {
  selector: '.headway-widget',
  account: 'x8wGEy',
};

const HeadwayWidget = () => {
  useEffect(() => {
    let isMounted = true;
    const script = document.createElement('script');
    script.id = 'headway-widget-script';
    script.async = true;
    script.src = 'https://cdn.headwayapp.co/widget.js';
    document.head.appendChild(script);
    script.onload = () => {
      if (isMounted) {
        document.getElementById('headway-widget').innerHTML = '';
        window.Headway.init(CONFIG);
      }
    };

    return () => {
      isMounted = false;
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <span className="headway-widget" id="headway-widget" />
    </>
  );
};

export default HeadwayWidget;
