// frontend/src/utils/cartStorage.ts

const CART_KEY = "liquor_lane_cart_v1";

export type CartItem = {
    id: string;        // product id
    name: string;
    price: number;
    quantity: number;
    storeId: string;
};

export type CartState = CartItem[];

export function loadCart(): CartState {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch {
        return [];
    }
}

export function saveCart(cart: CartState) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
        // ignore
    }
}
