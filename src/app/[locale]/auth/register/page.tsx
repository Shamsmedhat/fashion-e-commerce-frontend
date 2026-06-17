import RegisterForm from "@/components/features/auth/register-form";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col my-8 py-4">
      {/* Form */}
      <RegisterForm />
    </main>
  );
}
