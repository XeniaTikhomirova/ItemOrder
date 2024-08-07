import useCart from "../hooks/useCart";
import { useState } from "react";
import CartLineItem from "./CartLineItem";

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTION, totalItems, totalPrice, cart } = useCart();

  const onSumbitOrder = () => {
    {
      dispatch({ type: REDUCER_ACTION.SUMBIT }), setConfirm(true);
    }
  };

  const pageContent = confirm ? (
    <h2>Thank you for your order!</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.code}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTION={REDUCER_ACTION}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>{" "}
        <button
          className="cart__submit"
          onClick={onSumbitOrder}
          disabled={!totalItems}
        >
          Sumbit Order
        </button>
      </div>
    </>
  );

  const content = <main className="main__cart">{pageContent}</main>;

  return content;
};

export default Cart;
