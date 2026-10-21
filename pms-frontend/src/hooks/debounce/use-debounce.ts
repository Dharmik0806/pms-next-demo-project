"use client";
// Returns `value` only after it stopped changing for `delay` ms.
// Used by search boxes so we don't call the API on every keystroke.
import { useEffect, useState } from "react";
import type { DebounceDelay } from "./debounce.types";

export function useDebounce<T>(value: T, delay: DebounceDelay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // restart the timer when value changes
  }, [value, delay]);

  return debounced;
}
