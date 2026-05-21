import { useContext } from "react";
import { CartContext } from "@/context/cart-context";
import type { CartContextType } from "@/types";

export default function useCart() {
  const context = useContext<CartContextType | undefined>(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
