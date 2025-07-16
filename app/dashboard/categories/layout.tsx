import { getCategories } from "@/actions/category/get-category";
import CategoriesPage from "./page";

async function CategoriesLayout() {
  try {
    const categories = await getCategories();
    return <CategoriesPage initialCategories={categories} />;
  } catch (error) {
    console.error("Error loading categories:", error);
    return <CategoriesPage initialCategories={[]} />; // Fallback
  }
}

export default CategoriesLayout;
