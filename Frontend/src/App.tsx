import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/customer/HomePage/HomePage';
import AllProductsPage from './pages/customer/AllProductsPage/AllProductsPage';
import DetailProduct from './pages/customer/DetailProduct/DetailProduct';
import Cart from './pages/customer/Cart/Cart';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/Auth/ProfilePage';
import Orders from './pages/customer/Orders/Orders';
import OrderDetail from './pages/customer/OrderDetail/OrderDetail';
import CheckoutPage from './pages/customer/Checkout/CheckoutPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<AllProductsPage />} />
            <Route path="DetailProduct/:id" element={<DetailProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
