import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/layout/Layout";
import HomePage from "./pages/HomePage";
import SentInvoiceListPage from "./pages/user/SentInvoiceListPage";
import LoginPage from "./pages/LoginPage";
import InvoiceCreatePage from "./pages/user/InvoiceCreatePage";
import ReciveInvoiceListPage from "./pages/user/ReciveInvoiceListPage";
import TestPage from "./pages/TestPage";
import "./App.css";
import GetUsersPage from "./pages/admin/GetUsersPage";
import GetCompaniesPage from "./pages/admin/GetCompaniesPage";
import CreateCompanyPage from "./pages/admin/CreateCompanyPage";
import CreateUserPage from "./pages/admin/CreateUserPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-login" element={<LoginPage />} />
          <Route path="/test" element={<TestPage />} />

          {/* ADMIN */}
          <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
          <Route path="/admin/settings" element={<div>Admin Settings</div>} />
          <Route path="/admin/users" element={<GetUsersPage />} />
          <Route path="/admin/users/create" element={<CreateUserPage />} />
          <Route path="/admin/companies" element={<GetCompaniesPage />} />
          <Route
            path="/admin/companies/create"
            element={<CreateCompanyPage />}
          />
          <Route
            path="/admin/invoices"
            element={<div>Faturaların hepsini listele</div>}
          />
          <Route path="/admin/roles/create" element={<div>Rol Oluştur</div>} />
          <Route path="/admin/roles" element={<div>Rol Listele</div>} />
          {/* USER */}
          <Route path="/user/dashboard" element={<div>User Dashboard</div>} />
          <Route path="/user/profile" element={<div>User Profile</div>} />
          <Route
            path="/user/invoices/sent-invoice-list"
            element={<SentInvoiceListPage />}
          />
          <Route
            path="/user/invoices/recive-invoice-list"
            element={<ReciveInvoiceListPage />}
          />
          <Route
            path="/user/invoices/invoice-create"
            element={<InvoiceCreatePage />}
          />

          {/* 404 */}
          <Route path="*" element={<div>404 Sayfa Bulunamadı</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
