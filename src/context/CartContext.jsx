import { createContext, useContext, useReducer, useEffect } from "react";

// Criamos o Contexto
const CartContext = createContext();

// Ações
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_CART = "CLEAR_CART";

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const existingItemIndex = state.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size,
      );

      if (existingItemIndex > -1) {
        // Forma correta: Map cria um NOVO array e um NOVO objeto para o item alterado
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 } // Cria cópia do objeto com qtd nova
            : item,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case REMOVE_ITEM:
      return state.filter(
        (item) =>
          !(item.id === action.payload.id && item.size === action.payload.size),
      );

    case UPDATE_QUANTITY:
      return state.map((item) => {
        if (
          item.id === action.payload.id &&
          item.size === action.payload.size
        ) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

    case CLEAR_CART:
      return [];

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("futshop_cart");
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("futshop_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product, size, customization) => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size,
        customization,
      },
    });
  };

  
  const removeItem = (id, size) => {
    dispatch({ type: REMOVE_ITEM, payload: { id, size } });
  };
  
  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: UPDATE_QUANTITY, payload: { id, size, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// --- AQUI ESTAVA O ERRO ---
// Você provavelmente esqueceu de exportar essa função "useCart" no final
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};
