import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Navigate, Outlet } from "react-router-dom";

export default function AppLayout() {
  const user = true;

  if (!user) {
    return <Navigate to="/sign-up" />;
  }
  return (
    <div>
      <Banner />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
