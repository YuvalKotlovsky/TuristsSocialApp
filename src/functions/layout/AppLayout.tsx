import { Outlet } from "react-router-dom";
import { Footer as HeaderNav } from "@/functions/layout/Footer";

export default function AppLayout() {
  return (
    <>
      <HeaderNav />
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
}
