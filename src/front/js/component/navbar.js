import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Asegúrate de que importas el contexto adecuado

export const Navbar = () => {
    const { store, actions } = useContext(Context); // Usamos useContext para obtener el estado global
    const navigate = useNavigate(); // Para redirigir al usuario después de hacer log out

    // Función de log out
    const logOut = () => {
        actions.logoutSeller(); // Llama a la función logoutSeller que debe estar en tus acciones
        navigate("/seller/login"); // Redirigir al login después de hacer logout
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    {/* Si el vendedor está autenticado, mostramos el link de logout */}
                    {store.authenticatedSeller ? (
                        <button 
                            onClick={logOut} 
                            className="btn btn-danger"
                        >
                            Log Out
                        </button>
                    ) : (
                        <>
                            <Link to="/seller/login">
                                <button className="btn btn-primary">Login</button>
                            </Link>
                            <Link to="/seller/signup">
                                <button className="btn btn-primary">Signup</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
