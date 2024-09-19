import {Navigate, Outlet} from "react-router-dom";

type ProtectedRouteProps = {
    isAuthenticated: boolean;
}

export default function ProtectedRoute({ isAuthenticated }: ProtectedRouteProps) {
    return (
            isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />
    )
}
