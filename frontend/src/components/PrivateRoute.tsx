import auth from "../services/auth";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface IProtectionRoute {
  children: ReactElement;
}

const PrivateRoute = ({ children }: IProtectionRoute) => {
  const isAuthenticated = auth.isUserConnected();

  // Si l'utilisateur n'est pas connecté => redirection vers la page loggin
  if (!isAuthenticated) return <Navigate to="/"></Navigate>;

  // Afficher le composant
  return children;
};

export default PrivateRoute;
