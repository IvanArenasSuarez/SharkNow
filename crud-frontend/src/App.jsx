import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Home from "./components/Home";
import CrearGuia from "./components/CrearGuia";
import Navbar from "./components/Navbar";
import Login_Form from "./components/Login_Form";
import Login_Carrusel from "./components/Login_Carrusel";
import MisGuias from "./components/MisGuias";
import EditarGuia from "./components/EditarGuia";
import EditarPregunta from "./components/EditarPregunta";
import Search from "./components/Search";
import QuizGuia from "./components/QuizGuia";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Registro from "./components/Registro";
import RecuperarContraseña from "./components/RecuperarContraseña";
import VerGuiaSeguida from "./components/VerGuiaSeguida";
import UserProfile from "./components/UserProfile";
import UserProfileAdmin from "./components/UserProfile";
import Reporte from "./components/Reporte";
import Avatar from "./components/Avatar";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    const getStoredToken = () => localStorage.getItem("token");

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
            <DndProvider backend={HTML5Backend}>
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
                            <Route path="/registro" element={<Registro />} />
                            <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/mis-guias" element={<MisGuias />} />
                            <Route path="/crear-guia" element={<CrearGuia />} />
                            <Route path="/editar-guia" element={<EditarGuia />} />
                            <Route path="/editar-pregunta" element={<EditarPregunta />} />                            
                            <Route path="/perfil" element={<Profile />} />
                            <Route path="/busqueda" element={<Search />} />
                            <Route path="/quiz-guia" element={<QuizGuia />} />
                            <Route path="/ver-guia-seguida" element={<VerGuiaSeguida />} />7
                            <Route path="/perfil/usuario" element={<UserProfile />} />
                            <Route path="/reporte" element={<Reporte />} />
                            <Route path="/avatar" element={<Avatar />} />
                            <Route path="/perfil/admin" element={<UserProfileAdmin />} />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </DndProvider>
            <Footer />
        </Router>
    );
}

export default App;