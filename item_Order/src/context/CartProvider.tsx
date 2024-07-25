import { useReducer, useMemo, createContext, ReactElement } from "react";

export type CartItemType = {
  code: string;
  name: string;
  price: number;
  qty: number;
};

export type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUMBIT: "SUMBIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload is missing in ADD action!");
      }
      const { code, name, price } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.code != code
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.code === code
      );

      const qty: number = itemExists ? itemExists.qty + 1 : 1;

      return {
        ...state,
        cart: [...filteredCart, { code, name, price, qty }],
      };
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload is missing in REMOVE action!");
      }

      const { code } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.code != code
      );

      return {
        ...state,
        cart: [...filteredCart],
      };
    }

    case REDUCER_ACTION_TYPE.SUMBIT: {
      return { ...state, cart: [] };
    }

    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload is missing in QUANTITY action!");
      }

      const { code, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.code === code
      );

      if (!itemExists) {
        throw new Error("Item must exist to update quantity");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.code != code
      );

      return {
        ...state,
        cart: [...filteredCart, updatedItem],
      };
    }

    default:
      throw new Error("unidentified reducer action type");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTION = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce((prevValue, cartItem) => {
    return prevValue + cartItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.code.slice(-4));
    const itemB = Number(b.code.slice(-4));
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTION, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTION: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
