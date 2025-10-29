import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi pathname (URL) change ho, scroll ko (0, 0) par le jao
    window.scrollTo(0, 0);
  }, [pathname]); // Yeh effect tabhi chalega jab pathname change hoga

  return null; // Yeh component kuch bhi render nahi karta
}

export default ScrollToTop;