import { Navigate, useLocation } from "react-router-dom";
import { ROLES } from "../constants";


// const AuthRedirect = ({ destination }) => {
//     const location = useLocation();
//     return <Navigate to={destination} replace state={{ from: location }} />;
// };

const Wrapper = (Layout, USER = null, Component) => {
    // let accessToken = localStorage.getItem("token");
    // let role = localStorage.getItem("role")
    // if (USER === ROLES.ADMIN) {
        // if (!accessToken || role != ROLES.ADMIN) {
            // return <AuthRedirect destination={"/admin"} />;
        // }
    // }
    // if (USER === ROLES.CUSTOMER) {
        // if (!accessToken || role !== ROLES.CUSTOMER) {
            // return <AuthRedirect destination="/login" />;
        // }
    // }
    return Layout ? <Layout>{Component}</Layout> : Component;

}

export default Wrapper;