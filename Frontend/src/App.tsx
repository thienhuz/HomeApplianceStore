import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/customer/HomePage/HomePage';
import AllProductsPage from './pages/customer/AllProductsPage/AllProductsPage';
import SearchResultsPage from './pages/customer/SearchResultsPage/SearchResultsPage';
import DetailProduct from './pages/customer/DetailProduct/DetailProduct';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/Auth/ProfilePage';
import Orders from './pages/customer/Orders/Orders';
import OrderDetail from './pages/customer/OrderDetail/OrderDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}> 
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchResultsPage />} />
            <Route path="products" element={<AllProductsPage />} />
            <Route path="DetailProduct/:id" element={<DetailProduct />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
