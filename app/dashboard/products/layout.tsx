import { getProducts } from "@/actions/product/get-product";
import ProductsPage from "./page";

async function LayoutProducts() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return <div>No hay productos registrados</div>;
  }

  return <ProductsPage products={products} />;
}

export default LayoutProducts;
