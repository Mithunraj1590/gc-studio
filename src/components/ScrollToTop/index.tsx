"use client";
import React, { useEffect } from "react";
import Style from "./ScrollToTop.module.scss";

const ScrollToTop: React.FC = () => {
  const handleScrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = (): void => {
      document.body.classList.toggle(
        "scroll-to-top-active",
        window.scrollY >= 100
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <button
        className={`${
          Style.scroll_to_top ?? "scroll-to-top"
        } rounded-full fixed bottom-[4%] right-[2%] z-[999]`}
        onClick={handleScrollToTop}
        style={{ width: "60px", height: "60px" }}
        aria-label="Scroll to top"
      >
        <span
          className={`absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4`}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABa0lEQVR4nO3YsUtVcRQH8E8ZZgaBJLjokoPg2lBjTUFCS0tO7i669S80CeGf4KBj1NDQEmRLDU1RSCAuRoGEEKKgFhfuhcfj9NSh5+/K+cBZfr8D93w53MflkVJK6QKbxRMtN48jHGNRSz3Fn656pkUuYSkI0dQyLivcIFZ7hGhqBVcU6jpenyJEUy9xTWFG8P4MIZp6ixsKMY7PwZAHwdlxcPYRo+cdYhLfguF+4X5w/hh7wfkXTJxXiNv4GQy1iem6p/uuchc/grstTPU7xD3sBsN8wFhHXxSkcgtfg/sd3OlXiAfYD4Z4geGu3n8FqdzEetCzW2/tv/sUPPw5BoLeXkEqQ1gL+tb7kMO7jgceYqFH70lBmi+B6tOls++NPqheyFf1+/DwhN7TBGnMYRsb9Q9JUc4SpGgZpDS5kdLkRkqTGylNbqQ0uZHS5EZKkxspTW6kNJ3/Qn7XYjP4XdcjLXe1rpRSSip/AVzt99pGrkiXAAAAAElFTkSuQmCC" alt="Scroll to top" />
        </span>
      </button>
    </>
  );
};

export default ScrollToTop;

