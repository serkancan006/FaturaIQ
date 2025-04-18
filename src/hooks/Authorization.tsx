import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; 

interface AuthorizationProps {
  allowedRoles: string[];
  redirectTo?: string;
}

/**
 * Belirli rollere sahip kullanıcıların erişebileceği route'lar için koruma sağlar.
 * @param allowedRoles Erişime izin verilen rollerin listesi
 * @param redirectTo Yetkisiz erişimde yönlendirilecek sayfa (default: /auth-login)
 */
const Authorization: React.FC<AuthorizationProps> = ({
  allowedRoles,
  redirectTo = "/auth-login",
}) => {
  const { isAuthenticated, userRoles } = useAuth();

  // Kullanıcı login değilse ya da roller yoksa
  if (!isAuthenticated || !userRoles) {
    return <Navigate to={redirectTo} replace />;
  }

  // En az bir eşleşen rol varsa geçişe izin ver
  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default Authorization;
