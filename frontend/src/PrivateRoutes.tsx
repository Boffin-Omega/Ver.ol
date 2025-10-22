// PrivateRoute.tsx
import { Navigate} from "react-router";
import App from './App'

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
  children?: React.ReactNode;
}

export default function PrivateRoute({
  isAuthenticated,
  redirectPath = "/login",
  children,
}: PrivateRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If children are passed, render them, else render nested routes
  return children ? <>{children}</> : <App />;
}
