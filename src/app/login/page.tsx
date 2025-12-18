import LoginForm from "@/components/auth/LoginForm";
import { bric } from "@/lib/font";

export default function Home() {
  return (
    <>
      <main className="h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1
            className={`${bric.className} text-(--primary-color) font-bold text-4xl`}
          >
            Portfolio Panel
          </h1>
          <LoginForm />
        </div>
      </main>
    </>
  );
}
