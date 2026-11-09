import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const isDemoAuthenticated =
        sessionStorage.getItem("psdawa-demo-auth") === "true";

    if (!isDemoAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

export default ProtectedRoute;