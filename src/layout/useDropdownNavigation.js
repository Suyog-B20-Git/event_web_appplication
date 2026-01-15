import { useEffect, useRef, useState } from "react";

export function useDropdownNavigation(items = [], onSelect) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e) => {
    if (!items.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev <= 0 ? items.length - 1 : prev - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0 && items[highlightedIndex]) {
          e.preventDefault();
          onSelect(items[highlightedIndex]);
        }
        break;
      default:
        break;
    }
  };

  return {
    highlightedIndex,
    setHighlightedIndex,
    handleKeyDown,
    itemRefs,
  };
}
