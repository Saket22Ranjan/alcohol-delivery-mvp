// frontend/src/utils/recentStores.ts

const STORAGE_KEY = "ll_recent_stores";

export function loadRecentStores(): string[] {
    if (typeof window === "undefined") return [];

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveRecentStore(id: string) {
    if (typeof window === "undefined") return;

    const existing = loadRecentStores().filter((storeId) => storeId !== id);
    const next = [id, ...existing].slice(0, 5); // max 5 recent

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
