import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [cunt, setCunt] = useState("");
    const [reCunt, setReCunt] = useState("");
    const [tipo, setTipo] = useState(1);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    function usuario(nombre, apellidos, correo, tipo, contraseña, reContraseña){
        this.nombre = nombre
        this.apellidos = apellidos
        this.correo = correo
        this.tipo = tipo
        this.contraseña = contraseña
        this.reContraseña = reContraseña  
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+$/;
        return regex.test(email);
    };


    const handleRegistro = async () => {
        setError(null);

        if(!validateEmail(correo)) {
            setError("El correo ingresado no es válido")
            return;
        }

        try {
            console.table(new usuario(nombre, apellidos, correo, tipo, cunt, reCunt))
        } catch (ina) {
            setError("Error al recibir la información")
        }
    };

    const gotoLogin = () => {
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-3xl p-8 rounded-lg shadow-lg mx-auto">
                <h1 className="text-4xl font-bold text-center mb-6">Registro</h1>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Primera columna */}
                    <div className="flex flex-col gap-4">
                        <fieldset>
                            <legend className="font-semibold mb-1">Nombre</legend>
                            <input 
                                type="text" 
                                className="input w-full" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <legend className="font-semibold mb-1">Apellidos</legend>
                            <input 
                                type="text" 
                                className="input w-full"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                                required
                                />
                        </fieldset>
                        <fieldset>
                            <legend className="font-semibold mb-1">Correo Institucional</legend>
                            <input 
                                type="email" 
                                className="input w-full" 
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                                />
                        </fieldset>
                    </div>

                    {/* Segunda columna */}
                    <div className="flex flex-col gap-4">
                        <fieldset>
                            <legend className="font-semibold mb-1">Contraseña</legend>
                            <input 
                                type="password" 
                                className="input w-full" 
                                value={cunt}
                                onChange={(e) => setCunt(e.target.value)}
                                required
                                />
                        </fieldset>
                        <fieldset>
                            <legend className="font-semibold mb-1">Reescribir Contraseña</legend>
                            <input 
                                type="password" 
                                className="input w-full" 
                                value={reCunt}
                                onChange={(e) => setReCunt(e.target.value)}
                                required
                                />
                        </fieldset>
                    </div>
                </div>

                {/* Botones alineados en una sola fila */}
                <div className="flex justify-center gap-4 mt-6">
                    <button onClick={handleRegistro} className="btn btn-primary w-40 h-12 text-lg">Registrarse</button>
                    <button onClick={gotoLogin} className="btn btn-secondary w-40 h-12 text-lg">Cancelar</button>
                </div>
            </div>
        </div>
    );
}
