import BagSection from "./_components/bag-section";
import BagHeader from "./_components/bag-header";

export default async function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <BagHeader />

      {/* Main Content - Client Component for real-time updates */}
      <BagSection />
    </main>
  );
}
