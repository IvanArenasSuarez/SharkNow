import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function RecuperarContraseña() {
    const navigate = useNavigate();

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [codigo, setCodigo] = useState("");
    const [cunt, setCunt] = useState("");
    const [reCunt, setReCunt] = useState("");
    const [mostrarContra, setMostrarContra] = useState(false);
    const [mostrarReContra, setMostrarReContra] = useState(false);

    const validarCorreo = (email) => {
        const regex = /^[^\s@]+@([a-zA-Z0-9.-]+)$/;
        const match = email.match(regex);

        if (!match) return false;

        const domain = match[1];
        return domain === "alumno.ipn.mx" || domain === "ipn.mx";
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setError(validarCorreo(newEmail) ? "" : "Correo no válido. Debe ser del dominio 'alumno.ipn.mx' o 'ipn.mx'.");
    };

    const gotoLogin = () => {
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-3xl p-8 rounded-lg shadow-lg">
                {/* Pantalla 1: Ingreso de correo */}
                {!mostrarFormulario ? (
                    <>
                        <h1 className="text-4xl font-bold text-center mb-6">Recuperar Contraseña</h1>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <div className="flex flex-col gap-4 items-center">
                            <fieldset className="w-1/2 flex flex-col">
                                <legend className="font-semibold mb-1 text-center">Correo Institucional</legend>
                                <input
                                    type="email"
                                    className="input w-full text-lg"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </fieldset>
                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    className="btn btn-primary w-40 h-12 text-lg"
                                    onClick={() => setMostrarFormulario(true)}
                                    disabled={error !== "" || email === ""}
                                >
                                    Enviar
                                </button>
                                <button onClick={gotoLogin} className="btn btn-secondary w-40 h-12 text-lg">Regresar</button>
                            </div>
                        </div>
                    </>
                ) : (
                    // Pantalla 2: Ingreso de código y cambio de contraseña
                    <>
                        <h1 className="text-4xl font-bold text-center mb-6">Cambiar Contraseña</h1>
                        <div className="flex flex-col gap-4 items-center">
                            {/* Código de recuperación */}
                            <fieldset className="w-1/2 flex flex-col">
                                <legend className="font-semibold mb-1 text-center">Código de recuperación</legend>
                                <input
                                    type="text"
                                    className="input w-full text-lg"
                                    placeholder=""
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                />
                            </fieldset>

                            {/* Nueva contraseña */}
                            <fieldset className="w-1/2 flex flex-col">
                                <legend className="font-semibold mb-1 text-center">Contraseña Nueva</legend>
                                <input
                                    type={mostrarContra ? "text" : "password"}
                                    className="input w-full text-lg"
                                    minLength={8}
                                    placeholder=""
                                    value={cunt}
                                    onChange={(e) => setCunt(e.target.value)}
                                    required
                                />
                            </fieldset>
                            {/* Checkbox para mostrar contraseña */}
                            <div className="w-1/2 flex items-center">
                                <input
                                    type="checkbox"
                                    id="mostrarContra"
                                    className="checkbox checkbox-info mr-2"
                                    checked={mostrarContra}
                                    onChange={() => setMostrarContra(!mostrarContra)}
                                />
                                <label htmlFor="mostrarContra" className="text-sm">Mostrar contraseña</label>
                            </div>

                            {/* Confirmar contraseña */}
                            <fieldset className="w-1/2 flex flex-col">
                                <legend className="font-semibold mb-1 text-center">Reescribir Contraseña</legend>
                                <input
                                    type={mostrarReContra ? "text" : "password"}
                                    className="input w-full text-lg"
                                    minLength={8}
                                    placeholder=""
                                    value={reCunt}
                                    onChange={(e) => setReCunt(e.target.value)}
                                    required
                                />
                            </fieldset>
                            {/* Checkbox para mostrar confirmación de contraseña */}
                            <div className="w-1/2 flex items-center">
                                <input
                                    type="checkbox"
                                    id="mostrarReContra"
                                    className="checkbox checkbox-info mr-2"
                                    checked={mostrarReContra}
                                    onChange={() => setMostrarReContra(!mostrarReContra)}
                                />
                                <label htmlFor="mostrarReContra" className="text-sm">Mostrar contraseña</label>
                            </div>

                            {/* Botones */}
                            <div className="flex justify-center gap-4 mt-6">
                                <button className="btn btn-primary w-40 h-12 text-lg">Cambiar contraseña</button>
                                <button
                                    className="btn btn-secondary w-40 h-12 text-lg"
                                    onClick={() => setMostrarFormulario(false)}
                                >
                                    Regresar
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}