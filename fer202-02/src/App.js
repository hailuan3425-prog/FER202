import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>

      {/* Header luôn hiển thị */}
      <Header />

      <Routes>

        {/* khi vào localhost:3000 */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* trang login */}
        <Route path="/login" element={<Login />} />

        {/* trang dashboard */}
        <Route path="/home" element={<Home />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;