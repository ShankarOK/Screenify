import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Screenify" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

// Landing page component
const LandingPage = () => {
  return (
    <>
      <Hero />
    </>
  );
};

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <div className="pt-28">
        <LandingPage />
      </div>
    </main>
  );
}
