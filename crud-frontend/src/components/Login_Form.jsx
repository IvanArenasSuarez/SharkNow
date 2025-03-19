import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login_Form({ onLogin }) {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        setError(null); // Limpiar errores previos

        if (!validateEmail(correo)) {
            setError("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        setIsLoading(true);

        try {
            await onLogin({ email: correo, password: contraseña });
        } catch (err) {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setIsLoading(false);
        }
    };

    const navigate = useNavigate();

    const gotoRegistro = () => {
        navigate("/registro");
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 rounded-lg shadow-lg w-80 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div className="flex flex-col gap-2">
                    <input
                        type="email"
                        className="input input-bordered p-2 border border-gray-300 rounded-md"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="input input-bordered p-2 border border-gray-300 rounded-md"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-link self-end">¿Olvidaste tu contraseña?</button>

                <div className="flex gap-2">
                    <button
                        className={`btn flex-1 ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white py-2 rounded`}
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                    <button onClick={gotoRegistro} className="btn btn-secondary flex-1">Registrarse</button>
                </div>
            </div>
        </div>
    );
}
