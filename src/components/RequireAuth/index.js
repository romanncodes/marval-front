import { Navigate, useLocation } from "react-router-dom";
import AuthConsumer from "../../helpers/auth";

export function RequireAuth({ children }){
    const [authed] = AuthConsumer()
    const location = useLocation()
    return authed.auth === true ? (
        children
    ) : (
        <Navigate to={"/"} replace state={{ path: location.pathname}}></Navigate>
    );
}