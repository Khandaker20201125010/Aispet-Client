
import { Navigate, useLocation } from "react-router-dom";

import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const PriveteRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 animate-bounce"></div>
          <p className="text-xl font-medium text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }

  // Show alert before redirecting to login page
  Swal.fire({
    icon: "warning",
    title: "Please Login",
    text: "You need to log in to view this page.",
    showConfirmButton: true,
    timer: 3000,
  });

  return <Navigate state={{ from: location }} to="/login" replace />;
};

export default PriveteRoutes;
