import { getProducts } from "@/actions/product/get-product";
import ProductsPage from "./page";

async function LayoutProducts() {
  const products = await getProducts();

  return <ProductsPage products={products} />;
}

export default LayoutProducts;
