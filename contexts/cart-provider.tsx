"use client";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export interface ICartItem {
  id: string; // product id
  name: string;
  price: number | null;
  crossed_price: number | null;
  quantity: number;
  image: string | null;
}

export interface ICartProduct {
  id: string;
  name: string;
  price: number | null;
  crossed_price: number | null;
  image: string | null;
}

interface CartContextType {
  cart: ICartItem[];
  addToCart: (product: ICartProduct, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem(getStorageKey());
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(cart));
  }, [cart]);

  const getStorageKey = () => {
    const hostname = window.location.hostname;
    return `cart_${hostname}`;
  };

  const addToCart = (product: ICartProduct, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item: ICartItem) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item: ICartItem) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
      }

      // Ensure the new item matches ICartItem
      const newCartItem: ICartItem = {
        id: product.id,
        name: product.name,
        price: product.price || null,
        crossed_price: product.crossed_price || null,
        quantity: quantity,
        image: product.image || null,
      };

      return [...prevCart, newCartItem];
    });
    setIsCartOpen(true);
  };

  const increaseQuantity = (productId: string) => {
    setCart((prevCart) => prevCart.map((item: ICartItem) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decreaseQuantity = (productId: string) => {
    setCart(
      (prevCart) => prevCart.map((item: ICartItem) => (item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)).filter((item: ICartItem) => item.quantity > 0) // Remove item if quantity reaches 0
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item: ICartItem) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, increaseQuantity, decreaseQuantity }}>{children}</CartContext.Provider>;
};
