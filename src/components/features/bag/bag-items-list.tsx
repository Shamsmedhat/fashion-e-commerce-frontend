import { ShoppingBag } from "lucide-react";
import BagItem from "./bag-item";
import { Link } from "@/i18n/navigation";
import { getBagItemsService } from "@/lib/services/bag.service";
import { getTranslations } from "next-intl/server";

export default async function BagItemsList() {
  // Translations
  const t = await getTranslations();

  // Fetch
  const bagData = await getBagItemsService();
  const items = bagData.data.items;

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center">
        <ShoppingBag strokeWidth={0.5} size={180} aria-hidden="true" />
        <p className="text-gray-600 text-2xl mb-4 first-letter:uppercase">{t("empty-bag")}</p>
        <Link href="/" className="text-lg text-gray-900 underline hover:no-underline capitalize">
          {t("continue-shopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <BagItem key={item._id} item={item} />
      ))}
    </div>
  );
}
