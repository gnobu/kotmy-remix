import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Footer from "~/components/public/Footer";
import Navigation from "~/components/public/Navigation";

export const meta: MetaFunction = () => {
  return [
    { title: "Kid of the Month & Year" },
    { name: "description", content: "Welcome to the best contest platform for children of all ages!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}
