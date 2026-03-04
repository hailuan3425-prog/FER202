import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import AccountListPage from "./pages/AccountListPage";
import { AuthProvider } from "./contexts/AuthContext";
import AccountDetailPage from "./pages/AccountDetailPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/accounts" element={<AccountListPage />} />
          <Route path="/accounts/:id" element={<AccountDetailPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;