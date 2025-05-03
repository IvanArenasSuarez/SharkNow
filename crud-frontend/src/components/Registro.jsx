import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Estados básicos
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [cunt, setCunt] = useState("");
    const [reCunt, setReCunt] = useState("");
    const [tipo, setTipo] = useState(1); // 1 para alumno, 2 para profesor
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState([]);
    const [mostrarContra, setMostrarContra] = useState(false);
    const [mostrarReContra, setMostrarReContra] = useState(false);
    
    // Estados para profesores
    const [academias, setAcademias] = useState([]); // Lista de academias disponibles
    const [academiasSeleccionadas, setAcademiasSeleccionadas] = useState([0]); // Array de academias seleccionadas

    // Cargar academias solo si es profesor
    useEffect(() => {
        if (tipo === 2) {
            const fetchAcademias = async () => {
                try {
                    const response = await fetch('http://localhost:4000/academias');
                    if (!response.ok) {
                        throw new Error("Error al cargar las academias");
                    }
                    const data = await response.json();
                    console.log("Academias: ", data);
                    setAcademias(data);
                } catch (err) {
                    console.error("Error:", err);
                    setError("No se pudieron cargar las academias");
                }
            };
            
            fetchAcademias();
        }
    }, [tipo]);

    function usuario(nombre, apellidos, correo, tipo, contraseña, reContraseña, academias = []){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.tipo = tipo;
        this.contraseña = contraseña;
        this.reContraseña = reContraseña;
        this.academias = academias;
    }

    const validarCorreo = (email, tipoUsuario) => {
        const regex = /^[^\s@]+@([a-zA-Z0-9.-]+)$/;
        const match = email.match(regex);

        if (!match) return false;

        const domain = match[1];
        
        if (tipoUsuario === 1) { // Alumno
            return domain === "alumno.ipn.mx";
        } else if (tipoUsuario === 2) { // Profesor
            return domain === "ipn.mx";
        }
        
        return false;
    };

    const validarContra = (cunt) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
        return regex.test(cunt);
    };

    async function verificarCorreoExistente(correo){
        try{
            const response = await fetch(`http://localhost:4000/verificarCorreo/${encodeURIComponent(correo)}`);
            if(!response.ok) {
                throw new Error("Error al verificar el correo");
            }

            const data = await response.json();
            return data.existe;
        }
        catch(err){
            console.error("Error: ", err);
            return false;
        }
    }

    // Manejar cambio de academia seleccionada
    const handleAcademiaChange = (index, value) => {
        const nuevasAcademias = [...academiasSeleccionadas];
        nuevasAcademias[index] = value;
        setAcademiasSeleccionadas(nuevasAcademias);
    };

    // Agregar nuevo campo de academia
    const agregarAcademia = () => {
        if (academiasSeleccionadas.length < academias.length) {
            setAcademiasSeleccionadas([...academiasSeleccionadas, 0]);
        }
    };

    // Eliminar campo de academia
    const eliminarAcademia = (index) => {
        if (academiasSeleccionadas.length > 1) {
            const nuevasAcademias = academiasSeleccionadas.filter((_, i) => i !== index);
            setAcademiasSeleccionadas(nuevasAcademias);
        }
    };

    const handleRegistro = async () => {
        setError(null);
        let errores = [];
        
        // Validaciones básicas
        if(!nombre.trim()) errores.push("El nombre no puede estar vacío");
        if(!apellidos.trim()) errores.push("Los apellidos no pueden estar vacíos");
        if(!correo.trim()) errores.push("El correo no puede estar vacío");
        if(!cunt) errores.push("La contraseña no puede estar vacía");
        if(!reCunt) errores.push("Debe confirmar la contraseña");

        // Validar correo según tipo de usuario
        if (!validarCorreo(correo, tipo)) {
            errores.push(`El correo ingresado no es válido para ${tipo === 1 ? "alumno" : "profesor"}`);
        }

        // Verificar si el correo ya existe
        if (validarCorreo(correo, tipo)) {
            try {
                const correoExiste = await verificarCorreoExistente(correo);
                if(correoExiste) {
                    errores.push("El correo ya está registrado");
                }
            } catch (err) {
                console.error("Error verificando correo:", err);
                errores.push("Error al verificar disponibilidad del correo");
            }
        }

        // Validar contraseña
        if (!validarContra(cunt)) {
            errores.push("La contraseña debe tener al menos 8 caracteres, incluir letras minúsculas, mayúsculas y números");
        }

        // Validar coincidencia de contraseñas
        if (cunt !== reCunt) {
            errores.push("Las contraseñas no coinciden.");
        }

        // Validaciones específicas para profesores
        if (tipo === 2) {
            const academiasFiltradas = academiasSeleccionadas.filter(a => a !== 0);
            if (academiasFiltradas.length === 0) {
                errores.push("Debe seleccionar al menos una academia");
            } else {
                // Verificar academias duplicadas
                const academiasUnicas = new Set(academiasFiltradas);
                if (academiasUnicas.size !== academiasFiltradas.length) {
                    errores.push("No puede seleccionar la misma academia más de una vez");
                }
            }
        }

        if (errores.length > 0) {
            setValidationErrors(errores);
            return;
        }

        try {
            const academiasProfesor = tipo === 2 
                ? academiasSeleccionadas.filter(a => a !== 0) 
                : [];
            
            console.table(new usuario(nombre, apellidos, correo, tipo, cunt, reCunt, academiasProfesor));
            
            setValidationErrors([]);
            const info = {
                nombre: nombre.trim(),
                apellidos: apellidos.trim(),
                correo: correo.trim(),
                tipo: tipo,
                contrasena: cunt,
                academias: academiasProfesor
            }

            const response = await fetch("http://localhost:4000/cuenta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            alert("Usuario Registrado Correctamente.");
            window.dispatchEvent(new Event("avatarActualizado"));
            navigate(-1);
        } catch (ina) {
            setError("Error al recibir la información.");
        }
    };

    const gotoLogin = () => {
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg mx-auto">
                <h1 className="text-4xl font-bold text-center mb-6">Registro</h1>

                {/* Toggle para seleccionar tipo de usuario */}
                <div className="flex justify-center mb-6">
                    <div className="join">
                        <button 
                            className={`join-item btn ${tipo === 1 ? "btn-primary" : "btn-outline"}`}
                            onClick={() => {
                                setTipo(1);
                                setAcademiasSeleccionadas([""]);
                            }}
                        >
                            Alumno
                        </button>
                        <button 
                            className={`join-item btn ${tipo === 2 ? "btn-primary" : "btn-outline"}`}
                            onClick={() => setTipo(2)}
                        >
                            Profesor
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {validationErrors.length > 0 && (
                    <ul className="text-red-500 text-sm text-center">
                        {validationErrors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Primera columna (común para ambos tipos) */}
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
                            <legend className="font-semibold mb-1">
                                Correo Institucional {tipo === 1 ? "(@alumno.ipn.mx)" : "(@ipn.mx)"}
                            </legend>
                            <input 
                                type="email" 
                                className="input w-full" 
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                                placeholder={tipo === 1 ? "usuario@alumno.ipn.mx" : "usuario@ipn.mx"}
                            />
                        </fieldset>
                    </div>

                    {/* Segunda columna (común para ambos tipos) */}
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

                {/* Sección adicional solo para profesores (academias) */}
                {tipo === 2 && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Academias a las que pertenece</h2>
                        <div className="space-y-3">
                            {academiasSeleccionadas.map((academia, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <select
                                        className="select select-bordered w-full max-w-xs"
                                        value={academia}
                                        onChange={(e) => handleAcademiaChange(index, e.target.value)}
                                        required={index === 0}
                                    >
                                        <option value="">Seleccione una academia</option>
                                        {academias
                                            .filter(a => !academiasSeleccionadas.includes(a.id) || a.id === academia)
                                            .map((acad) => (
                                                <option key={acad.id} value={acad.id_academia}>
                                                    {acad.nombre}
                                                </option>
                                            ))}
                                    </select>
                                    {index > 0 && (
                                        <button 
                                            type="button" 
                                            className="btn btn-circle btn-outline btn-sm"
                                            onClick={() => eliminarAcademia(index)}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button 
                                type="button" 
                                className="btn btn-sm btn-outline mt-2"
                                onClick={agregarAcademia}
                                disabled={academiasSeleccionadas.length >= academias.length}
                            >
                                + Agregar otra academia
                            </button>
                        </div>
                    </div>
                )}

                {/* Botones alineados en una sola fila */}
                <div className="flex justify-center gap-4 mt-6">
                    <button onClick={handleRegistro} className="btn btn-primary w-40 h-12 text-lg">Registrarse</button>
                    <button onClick={gotoLogin} className="btn btn-secondary w-40 h-12 text-lg">Cancelar</button>
                </div>
            </div>
        </div>
    );
}