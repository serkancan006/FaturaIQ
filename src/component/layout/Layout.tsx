import React, { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import LayoutDropdown from "./LayoutDropdown";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, userRoles } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth-login");
  };

  return (
    <div>
      <header>
        <nav className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            {/* Sol taraftaki linkler */}
            <div className="d-flex">
              <Link style={{ textDecoration: "none" }} className="mx-1" to="/">
                Ana Sayfa
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="mx-1"
                    to="/user/invoices/sent-invoice-list"
                  >
                    Gönderilen Faturalar
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="mx-1"
                    to="/user/invoices/recive-invoice-list"
                  >
                    Gelen Faturalar
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="mx-1"
                    to="/user/invoices/invoice-create"
                  >
                    Fatura Oluştur
                  </Link>
                  {userRoles?.includes('ROLE_ADMIN') && <LayoutDropdown />}
                  <span
                    style={{ cursor: "pointer" }}
                    className="mx-1 text-primary"
                    onClick={handleLogout}
                  >
                    Çıkış
                  </span>
                  
                </>
              ) : (
                <Link
                  style={{ textDecoration: "none" }}
                  className="mx-1"
                  to="/auth-login"
                >
                  Giriş
                </Link>
              )}
            </div>
            {/* Sağ taraftaki Test linki */}
            <div>
              <Link
                style={{ textDecoration: "none" }}
                className="mx-1 text-secondary"
                to="/test"
              >
                Test
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="container-fluid  min-vh-100">{children}</main>
      <footer>
        <div className="container-fluid">
          <p>© 2025 Tüm Hakları Saklıdır</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
