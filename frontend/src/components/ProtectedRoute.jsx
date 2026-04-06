import { Navigate } from "react-router";
import { useAuth } from "../context/authContext"
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({children}) =>
{
    const {user,loading} = useAuth();

    if(loading){
        return <LoadingSpinner />
    }
    if (!user){
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute