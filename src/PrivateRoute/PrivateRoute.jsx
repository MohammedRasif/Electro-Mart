import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    <div className="justify-center mx-auto text-center min-h-min">
      <span className="loading loading-dots loading-sm"></span>
    </div>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
