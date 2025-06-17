import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wrapper from "../navigation/wrapper";
import { ROLES } from "../constants";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MainLayout from "../layout";
import Dashboard from "../pages/admin";

export default function Navigation() {

    const [loginKey, setLoginKey] = useState(0);

    const [userRole, setUserRole] = useState(
        localStorage.getItem("role") ?? null
    );
    const isAdmin = userRole === ROLES.ADMIN;


    const handleLogin = () => {
        setLoginKey((key) => key + 1);
    };

    const handleComponent = (AdminComponent = null, CustomerComponent = null) => {
        if (isAdmin && AdminComponent) {
            return <AdminComponent />;
        }

        if (!isAdmin && CustomerComponent) {
            return <CustomerComponent />;
        }

        return "NotFound";
    };

    // useEffect(() => {
    //     setUserRole(localStorage.getItem("role"));
    // }, [loginKey]);


    return (
        <Router>
            <Routes>
                <Route path="/" element={Wrapper(MainLayout, ROLES.CUSTOMER, handleComponent(null, Home))} />
                <Route path="/login" element={Wrapper(MainLayout, ROLES.CUSTOMER, handleComponent(null, Login))} />

                <Route path="/dashboard" element={Wrapper(MainLayout, ROLES.ADMIN, <Dashboard />)} />

            </Routes>

        </Router>
    );
}
