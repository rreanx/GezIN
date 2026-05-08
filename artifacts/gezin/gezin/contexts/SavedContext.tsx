import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SavedContextValue = {
  saved: string[];
  isSaved: (routeId: string) => boolean;
  toggleSave: (routeId: string) => void;
  hydrated: boolean;
};

const SavedContext = createContext<SavedContextValue | undefined>(undefined);

const STORAGE_KEY = "gezin:saved-routes:v1";

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              setSaved(parsed.filter((v): v is string => typeof v === "string"));
            }
          } catch {
            // ignore corrupt data
          }
        }
      })
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved)).catch(() => {});
  }, [saved, hydrated]);

  const isSaved = useCallback(
    (routeId: string) => saved.includes(routeId),
    [saved],
  );

  const toggleSave = useCallback((routeId: string) => {
    setSaved((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId],
    );
  }, []);

  const value = useMemo(
    () => ({ saved, isSaved, toggleSave, hydrated }),
    [saved, isSaved, toggleSave, hydrated],
  );

  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used within SavedProvider");
  return ctx;
}
