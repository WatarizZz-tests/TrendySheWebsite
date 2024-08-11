import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const { _id, name, price, images, selectedColor, quantity } = product;

    // Extract available quantity directly from the selectedColor object
    const availableQuantity = selectedColor.quantity;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item._id === _id && item.selectedColor.color === selectedColor.color
      );

      const currentQuantity = existingItem ? existingItem.quantity : 0;
      const newTotalQuantity = currentQuantity + quantity;

      if (newTotalQuantity <= availableQuantity) {
        if (existingItem) {
          // Update the quantity of the existing item
          return prevItems.map((item) =>
            item._id === _id && item.selectedColor.color === selectedColor.color
              ? { ...item, quantity: newTotalQuantity }
              : item
          );
        } else {
          // Add a new item to the cart
          return [...prevItems, { _id, name, price, images, selectedColor, quantity }];
        }
      } else {
        alert(`Cannot add more than ${availableQuantity} items to the cart`);
        return prevItems;
      }
    });
  };

  const removeFromCart = (productId, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => 
        !(item._id === productId && item.selectedColor.color === color)
      )
    );
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
