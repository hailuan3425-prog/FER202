import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainNav from './component/MainNav';
import QuantityEditor from './component/QuantityEditor';
import OrderConfirmModal from './component/OrderConfirmModal';
import ProductForm from './component/ProductForm';
import TodoList from './component/TodoList';

function App() {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<QuantityEditor />} />
        <Route path="/order" element={<OrderConfirmModal />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
