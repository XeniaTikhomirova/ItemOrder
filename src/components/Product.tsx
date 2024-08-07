import React, { memo, ReactElement } from "react";
import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTION: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTION,
  inCart,
}: PropsType): ReactElement => {
  //const img: string = require(`../images/${product.code}.png`)
  const img: string = new URL(`../images/${product.code}.png`, import.meta.url)
    .href;
  console.log(img);

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTION.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? "Item is in cart ✅" : null;

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img className="product__img" src={img} alt={product.name} />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  );

  return content;
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}

const Memoized = memo<typeof Product>(Product, areProductsEqual);

export default Memoized;
