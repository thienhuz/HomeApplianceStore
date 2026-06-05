import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import DetailProduct from './pages/DetailProduct/DetailProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="DetailProduct/:id" element={<DetailProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
