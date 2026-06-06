import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import DetailProduct from './pages/DetailProduct/DetailProduct';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/Auth/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}> 
            <Route index element={<HomePage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="search" element={<SearchResultsPage />} />
            <Route path="DetailProduct/:id" element={<DetailProduct />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
