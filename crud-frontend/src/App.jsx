import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Home from "./components/Home";
import CrearGuia from "./components/CrearGuia";
import Navbar from "./components/Navbar";
import Login_Form from "./components/Login_Form";
import Login_Carrusel from "./components/Login_Carrusel";
import MisGuias from "./components/MisGuias";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    // Obtiene el token almacenado en localStorage
    const getStoredToken = () => localStorage.getItem("token");

    // Decodifica el token y verifica su validez
    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            if (decoded.exp < now) {
                console.warn("Token expirado, cerrando sesión...");
                handleLogout();
                return null;
            }
            return decoded;
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            handleLogout();
            return null;
        }
    };

    // Cargar datos de usuario si hay un token válido
    useEffect(() => {
        const token = getStoredToken();
        if (token) {
            const user = decodeToken(token);
            if (user) {
                setIsAuthenticated(true);
                setUserData(user);
                localStorage.setItem("userData", JSON.stringify(user));
            }
        }
    }, []);

    // Maneja el inicio de sesión
    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post("http://localhost:4000/login", credentials);
            if (response.status === 200 && response.data.token) {
                localStorage.setItem("token", response.data.token);
                const user = decodeToken(response.data.token);
                if (user) {
                    setIsAuthenticated(true);
                    setUserData(user);
                    localStorage.setItem("userData", JSON.stringify(user));
                }
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            alert("Error en la autenticación.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setIsAuthenticated(false);
        setUserData(null);
    };

    return (
        <Router>
            {isAuthenticated && <Navbar userData={userData} onLogout={handleLogout} />}
            <Routes>
                <Route
                    path="/login"
                    element={!isAuthenticated ? (
                        <div className="flex h-screen">
                            <div className='flex-[2] flex justify-center items-center'>
                                <Login_Carrusel />
                            </div>
                            <div className='flex-[2] flex justify-center items-center'>
                                <Login_Form onLogin={handleLogin} />
                            </div>
                        </div>
                    ) : (
                        <Navigate to="/" />
                    )}
                />
                
                <Route 
                    path="/*" 
                    element={isAuthenticated ? (
                        <div className="flex flex-col h-screen">
                            <div className="flex-grow"> 
                                <Home /> 
                            </div>
                        </div>
                    ) : (
                        <Navigate to="/login" />
                    )}
                />
                <Route path="/mis_guias" element={<MisGuias/>}/>
                <Route path="/crear_guia" element={<CrearGuia/>}/>
            </Routes>
        </Router>
    );
}

export default App;
