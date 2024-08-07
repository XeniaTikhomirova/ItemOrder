import { createContext, ReactElement, useState} from "react";

export type ProductType = {
  code: string;
  name: string;
  price: number;
};

//const initState: ProductType[] = [];

const initState: ProductType[] = [
  {
    code: "item0001",
    name: "Tofu",
    price: 10.99,
  },
  {
    code: "item0002",
    name: "Avocado",
    price: 3.99,
  },
  {
    code: "item0003",
    name: "Coconut Milk",
    price: 5.99,
  },
];

export type UseProductsContextType = { products: ProductType[] };

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

   // useEffect(() => {
   //   const fetchProd = async (): Promise<ProductType[]> => {
   //     const data = await fetch("http://localhost:5173/products")
   //       .then((res) => {
   //         return res.json();
   //       })
   //       .catch((err) => {
   //         if (err instanceof Error) console.log(err.message);
   //       });
   //     return data;
   //   };
   //   fetchProd().then(products => setProducts(products));
   // }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
