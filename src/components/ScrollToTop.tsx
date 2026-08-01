import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Keeps navigation predictable across pages: a new page opens at the top,
 * while a link that carries a hash (e.g. "/#contact") scrolls to that section.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the target page a tick to mount before scrolling to the section.
      const timeout = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return () => clearTimeout(timeout);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
