import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const storedValue = isLocalStorageAvailable
    ? localStorage.getItem(key)
    : null;

  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isLocalStorageAvailable]);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setStoredValue] as [T, (newValue: T) => void];
}
export default useLocalStorage;
