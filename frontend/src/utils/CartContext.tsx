// frontend/src/utils/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
    loadCart,
    saveCart,
    type CartItem,
    type CartState,
} from "../utils/cartStorage";

type CartContextValue = {
    items: CartState;
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    updateQuantity: (productId: string, quantity: number) => void;
    total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [items, setItems] = useState<CartState>(() => loadCart());

    // 🔁 save to localStorage whenever cart changes
    useEffect(() => {
        saveCart(items);
    }, [items]);

    const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((p) => p.id === item.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === item.id
                        ? { ...p, quantity: p.quantity + quantity }
                        : p
                );
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const removeItem = (productId: string) => {
        setItems((prev) => prev.filter((p) => p.id !== productId));
    };

    const clearCart = () => setItems([]);

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
        );
    };

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, clearCart, updateQuantity, total }}
        >
            {children}
        </CartContext.Provider>
    );
};

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return ctx;
}
