
import { useEffect } from "react";

export function useProtection() {
  useEffect(() => {
    const prevent = (e: Event) => {
      e.preventDefault();
    };

    const preventShortcuts = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "u", "s", "a", "p"].includes(key)
      ) {
        e.preventDefault();
      }

      if (e.key === "F12") {
        e.preventDefault();
      }

      if (
        e.ctrlKey &&
        e.shiftKey &&
        ["i", "j", "c"].includes(key)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", prevent);
    document.addEventListener("selectstart", prevent);
    document.addEventListener("dragstart", prevent);
    document.addEventListener("keydown", preventShortcuts);

    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("selectstart", prevent);
      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("keydown", preventShortcuts);
    };
  }, []);
}
