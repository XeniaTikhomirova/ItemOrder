import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { ReactElement } from "react";
import Product from "./Product";

const ProductList = () => {
  const { dispatch, REDUCER_ACTION, cart } = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.code === product.code);
      return (
        <Product
          key={product.code}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTION={REDUCER_ACTION}
          inCart={inCart}
        />
      );
    });
  }
  const content = <main className="main main--products">{pageContent}</main>;
  return content;
};

export default ProductList;
