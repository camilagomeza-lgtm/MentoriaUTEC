import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar () {
    const { token, logout } = useAuth(); 
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav>
            {token ? (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/detail">Detalle</Link>
                    <Link to="/operaciones">Operaciones</Link>
                </>
            ) :
            (
                <>
                    <Link to= "/login">Iniciar Sesión</Link>
                    <Link to="/register">Registrarse</Link>
                </>
            )}
        </nav>
    )
}