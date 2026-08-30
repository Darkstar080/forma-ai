import { useEffect, useState } from "react";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        width: "44px",
        height: "44px",
        border: "none",
        borderRadius: "50%",
        background: "#e85d3f",
        color: "#fff",
        fontSize: "20px",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
        zIndex: 100,
      }}
    >
      ↑
    </button>
  );
}

export default ScrollToTop;