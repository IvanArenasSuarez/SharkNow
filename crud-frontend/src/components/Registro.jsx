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
    const [validationErrors, setValidationErrors] = useState([]);
    const [mostrarContra, setMostrarContra] = useState(false);
    const [mostrarReContra, setMostrarReContra] = useState(false);

    function usuario(nombre, apellidos, correo, tipo, contraseña, reContraseña){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.tipo = tipo;
        this.contraseña = contraseña;
        this.reContraseña = reContraseña;
    }

    const validarCorreo = (email) => {
        const regex = /^[^\s@]+@([a-zA-Z0-9.-]+)$/;
        const match = email.match(regex);

        if (!match) return { esValido: false, tipo: null };

        const domain = match[1];

        if (domain === "alumno.ipn.mx") {
            return { esValido: true, tipo: 1 };
        } else if (domain === "ipn.mx") {
            return { esValido: true, tipo: 2 };
        } else {
            return { esValido: false, tipo: null };
        }
    };

    const validarContra = (cunt) => {
        const regex = /^(?=.*[0-9])(?=.*[\W_]).{8,}$/; 
        return regex.test(cunt);
    };

    const handleRegistro = async () => {
        setError(null);
        let errores = [];

        const { esValido, tipo: nuevoTipo } = validarCorreo(correo);

        if (!esValido) {
            errores.push("El correo ingresado no es válido.");
        }

        if (!validarContra(cunt)) {
            errores.push("La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo.");
        }

        if (cunt !== reCunt) {
            errores.push("Las contraseñas no coinciden.");
        }

        if (errores.length > 0) {
            setValidationErrors(errores);
            return;
        }

        setTipo(nuevoTipo); // Asignar el nuevo tipo

        try {
            console.table(new usuario(nombre, apellidos, correo, nuevoTipo, cunt, reCunt));
            setValidationErrors([]);
        } catch (ina) {
            setError("Error al recibir la información.");
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
                {validationErrors.length > 0 && (
                    <ul className="text-red-500 text-sm text-center">
                        {validationErrors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                )}

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
                        {/* Campo de Contraseña */}
                        <fieldset>
                            <legend className="font-semibold mb-1">Contraseña</legend>
                            <input 
                                type={mostrarContra ? "text" : "password"} 
                                className="input w-full" 
                                minLength={8}
                                value={cunt}
                                onChange={(e) => setCunt(e.target.value)}
                                required
                            />
                        </fieldset>
                        {/* Checkbox para mostrar la contraseña */}
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="mostrarContra" 
                                className="checkbox checkbox-info mr-2"
                                checked={mostrarContra}
                                onChange={() => setMostrarContra(!mostrarContra)}
                            />
                            <label htmlFor="mostrarContra" className="text-sm">Mostrar contraseña</label>
                        </div>

                        {/* Campo de Confirmar Contraseña */}
                        <fieldset>
                            <legend className="font-semibold mb-1">Reescribir Contraseña</legend>
                            <input 
                                type={mostrarReContra ? "text" : "password"} 
                                className="input w-full" 
                                minLength={8}
                                value={reCunt}
                                onChange={(e) => setReCunt(e.target.value)}
                                required
                            />
                        </fieldset>
                        {/* Checkbox para mostrar la confirmación de contraseña */}
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="mostrarReContra" 
                                className="checkbox checkbox-info mr-2"
                                checked={mostrarReContra}
                                onChange={() => setMostrarReContra(!mostrarReContra)}
                            />
                            <label htmlFor="mostrarReContra" className="text-sm">Mostrar contraseña</label>
                        </div>
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
