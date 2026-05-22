import { Route, Routes } from "react-router-dom";
//auth routes & layout
import AuthLayout from "./layout/auth-layout";
import ProtectedLayout from "./layout/protected-layout";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
//protected routes & layout
import AppLayout from "./layout/app-layout";
import AddressPage from "./pages/address";
import CheckOutPage from "./pages/protected/checkout";
import MyOrderPage from "./pages/protected/my-order";
import OrderTrackingPage from "./pages/protected/order-tracking";

//public routes & layout
import FlashDealPage from "./pages/flash-deal";
import HomePage from "./pages/home";
import ProductDetailPage from "./pages/product";
import ProductsPage from "./pages/products";
import SearchPage from "./pages/search";

//not-found
import NotFoundPage from "./pages/not-found";
import ScrollToTop from "./components/scroll-to-top";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/check-out" element={<CheckOutPage />} />
            <Route path="/my-orders" element={<MyOrderPage />} />
            <Route path="/order-tracking/:id" element={<OrderTrackingPage />} />
            <Route path="/address" element={<AddressPage />} />
          </Route>

          <Route>
            <Route index element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/deals" element={<FlashDealPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
