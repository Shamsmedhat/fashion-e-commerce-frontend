import BagSection from "@/components/features/bag/bag-section";
import BagHeader from "@/components/features/bag/bag-header";

export default async function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <BagHeader />

      {/* Main Content */}
      <BagSection />
    </main>
  );
}
