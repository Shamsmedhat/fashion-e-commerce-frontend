import { getCategoriesService } from "@/lib/services/category.service";
import CategoriesUi from "./categories-ui";

export default async function CategoriesSection() {
  // Fetch
  const payload = await getCategoriesService({
    slug: ["women", "women-shoes", "women-accessories", "men", "children"],
  });

  // Variable
  const ids = payload.data.categories.map((category) => {
    return { id: category._id, slug: category.slug };
  });

  return <CategoriesUi ids={ids} />;
}
