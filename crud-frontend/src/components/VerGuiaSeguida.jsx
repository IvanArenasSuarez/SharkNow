import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function VerGuiaSeguida() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [dias, setDias] = useState({
        Lunes: false,
        Martes: false,
        Miércoles: false,
        Jueves: false,
        Viernes: false,
        Sábado: false,
        Domingo: false
    });
    const [hora, setHora] = useState("00");
    const [minuto, setMinutos] = useState("00");
    const [meSirve, setMeSirve] = useState(false);

    const [guia, setGuia] = useState(() => {
        const guiaGuardada = localStorage.getItem('guia');
        console.table(guiaGuardada);
        if (guiaGuardada) {
        return JSON.parse(guiaGuardada);
        }
        return {};
    });

   const handleChange = (e) => {
        const { name, value } = e.target;
        setGuia(prev => ({ ...prev, [name]: value }));
        localStorage.setItem("guia", JSON.stringify(guia));
    };

    const handleDiaChange = (dia) => {
        setDias(prev => ({
        ...prev,
        [dia]: !prev[dia]
        }));
    };

    const horas = Array.from({ length: 25 }, (_, i) => i);
    const minutos = Array.from({ length: 60 }, (_, i) => i);
    
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:4000/guias/progreso/info?id_gde=${guia.id}&id_usuario=${userData.id_usuario}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.table(data);

                if(data.length > 0) {
                    const progreso = data[0];

                    const formatFecha = (fecha) => {
                        if(!fecha) return '';
                        const date = new Date(fecha);
                        return date.toISOString().split('T')[0];
                    }

                    setFechaInicio(formatFecha(progreso.fecha_inicio));
                    setFechaFinal(formatFecha(progreso.fecha_final));

                    if (progreso.dias && Array.isArray(progreso.dias)) {
                    const nuevosDias = {
                        Lunes: progreso.dias.includes('Lunes'),
                        Martes: progreso.dias.includes('Martes'),
                        Miércoles: progreso.dias.includes('Miércoles'),
                        Jueves: progreso.dias.includes('Jueves'),
                        Viernes: progreso.dias.includes('Viernes'),
                        Sábado: progreso.dias.includes('Sábado'),
                        Domingo: progreso.dias.includes('Domingo')
                    };
                        setDias(nuevosDias);
                    }   

                    if (progreso.hora) {
                        const [h, m] = progreso.hora.split(':');
                        setHora(h);
                        setMinutos(m);
                    }
                }
            } catch (ina) {
                console.error('Error al obtener la información del progreso de guia', ina);
            }
        }
        obtenerDatos();
    }, []);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        const token = localStorage.getItem('token');

        // Convertir días seleccionados a formato de string (ej: "Lunes,Martes")
        const diasActivos = Object.entries(dias)
        .filter(([_, seleccionado]) => seleccionado)
        .map(([dia]) => dia);
        
        // Formatear hora completa
        const horaCompleta = `${hora}:${minuto}`;
        
        try {
        const datosProgreso = {
            id_gde: guia.id,
            id_usuario: userData.id_usuario,
            fecha_inicio: fechaInicio,
            fecha_final: fechaFinal,
            dias: diasActivos,
            hora: horaCompleta
        };
        
        console.table(datosProgreso);

        const resultado = await handleGuardarInfo(datosProgreso, token);
        console.log('Actualización exitosa:', resultado);
        alert('Progreso actualizado correctamente');
        
        } catch (error) {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar el progreso');
        }
    };

    const handleGuardarInfo = async (datosProgreso, token) => {
        try {
            const response = await fetch('http://localhost:4000/guias/progreso/actualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...datosProgreso,
                dias: datosProgreso.dias})
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || errorData.message || 'Error al actualizar el progreso');
            }

            return await response.json();
        } catch (ina) {
            console.error('Error al actualizar los datos de progreso: ', ina);
            throw ina;
        }
    };

    useEffect(() => {
    async function verificarMeSirve() {
      try {
        const res = await fetch(`http://localhost:4000/guias/sigue?id_usuario=${userData.id_usuario}&id_gde=${guia.id}`);
        const data = await res.json();
        setMeSirve(data?.mesirve === true);
      } catch (error) {
        console.error("Error al verificar mesirve:", error);
      }
    }

    if (guia?.id && userData?.id_usuario) {
      verificarMeSirve();
    }
  }, [guia?.id, userData?.id_usuario]);

  const toggleMeSirve = async () => {
    try {
      const url = meSirve
        ? 'http://localhost:4000/guias/quitar-mesirve'
        : 'http://localhost:4000/guias/marcar-mesirve';

      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: userData.id_usuario,
          id_gde: guia.id
        })
      });

      if (!res.ok) throw new Error("Error al actualizar MeSirve");
      setMeSirve(!meSirve);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const dejarDeSeguir = async () => {
    try {    
      // Cambiar estado de seguimiento de la guía
      await fetch(`http://localhost:4000/guias/dejar-de-seguir`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: userData.id_usuario,
          id_gde: guia.id
        })
      });

      // Redirigir a guia-sin-seguir
      navigate('/mis-guias');
    } catch (error) {
      console.error("Error al dejar de seguir la guía:", error);
    }
  };

    return (
        <div className="max-w-6xl mx-auto p-10 space-y-12 text-lg">
            {/* Primera Fila - 2 Columnas */}
            <div className="grid grid-cols-2 gap-10">

                {/* Columna Izquierda - Información de la Guía */}
                <div className="border border-gray-500 p-8 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">Información de la Guía</h2>
                    <ul className="space-y-4">
                        <li><strong>Nombre: </strong>{guia.nombre}</li>
                        <li><strong>Autor: </strong>{guia.usuario + " " + guia.apellidos}</li>
                        {guia.tipo === "C" && (
                            <>
                                <li><strong>Materia: </strong>{guia.materia}</li>
                                <li><strong>Academia: </strong>{guia.academia}</li>
                                <li><strong>Plan de Estudio: </strong>{guia.plan}</li>
                                <li><strong>Versión de la guía: </strong>{guia.version}</li>
                            </>
                        )}
                        <li><strong>Descripción: </strong>
                            <p className="text-gray-300 max-h-40 overflow-y-auto">{guia.descripcion}</p>
                        </li>
                    </ul>
                    {/* Botón de Estadísticas */}
                    <button className="btn btn-outline btn-accent mt-6 w-full"  onClick={() => navigate('/estadisticas')}>📊 Ver Estadísticas</button>
                </div>

                {/* Columna Derecha - Formulario de Notificaciones */}
                <div className="border border-gray-500 p-8 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">Periodo para realizar la sesión</h2>

                    {/* Fechas */}
                    <div className="flex gap-8 mb-6">
                        <div className="space-y-2">
                            <strong>Inicio:</strong>
                            <input 
                                type="date" 
                                className="input input-lg w-full" 
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                required
                                />
                        </div>
                        <div className="space-y-2">
                            <strong>Final:</strong>
                            <input 
                                type="date" 
                                className="input input-lg w-full" 
                                value={fechaFinal}
                                onChange={(e) => setFechaFinal(e.target.value)}
                                required
                                />
                        </div>
                    </div>

                    {/* Días de Estudio */}
                    <div className="mb-6">
                        <strong>Días a estudiar:</strong>
                        <div className="grid grid-cols-3 gap-x-6 gap-y-4 mt-4">
                            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia) => (
                                <label key={dia} className="flex items-center space-x-3">
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-lg checkbox-info" 
                                        checked={dias[dia]}
                                        onChange={() => handleDiaChange(dia)}
                                        />
                                    <span>{dia}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Hora de Notificación */}
                    <div className="flex justify-center gap-12 mb-6">
                        <label className="flex flex-col items-center space-y-2">
                            <strong>Hora:</strong>
                            <select 
                                className="select select-lg"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                                >
                                {horas.map((h) => (
                                    <option key={h} value={h}>
                                        {h.toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="flex flex-col items-center space-y-2">
                            <strong>Minutos:</strong>
                            <select 
                                className="select select-lg"
                                value={minuto}
                                onChange={(e) => setMinutos(e.target.value)}
                                >
                                {minutos.map((m) => (
                                    <option key={m} value={m}>
                                        {m.toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {/* Botones de Opinión */}
                    <div className="flex justify-center gap-12 mt-8">
                        <div className="flex flex-col items-center">
                            <button className="btn btn-lg flex items-center gap-1 btn-square btn-ghost" onClick={toggleMeSirve}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={meSirve ? "yellow" : "none"}
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke={meSirve ? "yellow" : "currentColor"}
                                    className="size-10 transition-colors"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                    />
                                </svg>
                            </button>
                            <span className="mt-2">Me Sirve</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <button className="btn btn-lg btn-square btn-ghost" onClick={dejarDeSeguir}>
                                <svg className="size-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                        <path d="m4.5 12.75 6 6 9-13.5"></path>
                                    </g>
                                </svg>
                            </button>
                            <span className="mt-2">Siguiendo</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Segunda Fila - Botones de Acción */}
            <div className="flex justify-center gap-8 mt-12">
                <button className="btn btn-lg btn-primary " onClick={() => navigate(`/quiz-guia/${guia.id}`)}>Comenzar Sesión</button>
                <button className="btn btn-lg btn-accent" 
                    onClick={() => {
                        handleSubmit();
                        navigate('/mis-guias')
                    }
                }>Salir y Guardar</button>
                <button className="btn btn-lg btn-error" onClick={() => navigate('/reporte')}>Reportar</button>
            </div>
        </div>
    );
}