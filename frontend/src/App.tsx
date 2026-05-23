import { Route, Routes } from "react-router-dom";

//not-found
import ScrollToTop from "./components/scroll-to-top";
import NotFoundPage from "./pages/not-found";

//auth routes & layout
import AuthLayout from "./layout/auth-layout";
import ProtectedLayout from "./layout/protected-layout";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
//protected routes & layout
import AppLayout from "./layout/app-layout";
import AddressPage from "./pages/protected/address";
import CheckOutPage from "./pages/protected/checkout";
import MyOrderPage from "./pages/protected/my-order";
import OrderTrackingPage from "./pages/protected/order-tracking";

//public routes & layout
import FlashDealPage from "./pages/flash-deal";
import HomePage from "./pages/home";
import ProductDetailPage from "./pages/product";
import ProductsPage from "./pages/products";
import SearchPage from "./pages/search";

//admin routes & layout
import AdminLayout from "./layout/admin-layout";
import AdminDashboard from "./pages/admin/admin-dashboard";
import AdminDeliveryPartners from "./pages/admin/admin-deliver-partners";
import AdminOrders from "./pages/admin/admin-orders";
import AdminProductForm from "./pages/admin/admin-product-form";
import AdminProducts from "./pages/admin/admin-products";

//delivery routes & layout
import DeliveryLayout from "./layout/delivery-layout";
import DeliveryDashboard from "./pages/delivery/delivery-dashboard";
import DeliveryLogin from "./pages/delivery/delivery-login";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Auth Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        {/* User Pages */}
        <Route element={<AppLayout />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/checkout" element={<CheckOutPage />} />
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

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProductForm />} />
          <Route path="products/:id/edit" element={<AdminProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="delivery-partners" element={<AdminDeliveryPartners />} />
        </Route>

        {/* Delivery Pages */}
        <Route path="/delivery/login" element={<DeliveryLogin />} />
        <Route path="/delivery" element={<DeliveryLayout />}>
          <Route index element={<DeliveryDashboard />} />
        </Route>
        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
