import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function MisGuiasProf() {
    const navigate = useNavigate();
    const gotoCrearGuias = () => navigate('/crear-guia');

    const [misGuias, setMisGuias] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
                const fetchGuias = async () => {
                    try {
                        const token = localStorage.getItem("token");
                        const response = await fetch("http://localhost:4000/guias/creadas", {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        const data = await response.json();
                        if (response.ok) {
                            setMisGuias(data);
                        } else {
                            console.error("Error:", data.message);
                        }
                    } catch (error) {
                        console.error("Error al obtener guías creadas:", error);
                    }
                };
        
                fetchGuias();
            }, []);
    
        useEffect(() => {
            const fetchSolicitudes = async () => {
                try {
                    const token = localStorage.getItem("token");
                    
                    // 1. Decodificar el token para obtener las academias
                    const decoded = jwtDecode(token);
                    const academias = decoded.academias || [];
                    
                    // 2. Buscar la academia donde es jefe
                    const academiaJefe = academias.find(a => a.jefe === true);
                    
                    if (!academiaJefe) {
                        console.error("El usuario no es jefe de ninguna academia");
                        return;
                    }
                    console.log("Academia jefe: ", academiaJefe)
                    const response = await fetch(`http://localhost:4000/guias/solicitudes/acad?id_academia=${academiaJefe.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setSolicitudes(data);
                        console.table(data);
                    } else {
                        console.error("Error: ", data.message);
                    }
                } catch (err) {
                    console.error("Error al obtener las solicitudes: ", err);
                }
            }
            fetchSolicitudes();
        }, []);

    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-6">
            <h1 className="text-4xl font-bold text-center mb-6 w-full">Guias de Estudio</h1>
            <div className="flex flex-col lg:flex-row justify-between gap-6 w-full max-w-7xl">
                {/* Mis Guías */}
                <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-center">Guías creadas</h1>

                    <div className="flex items-center gap-2">
                        <label className="input flex-[3] flex items-center border rounded-lg px-3 py-1">
                            <svg className="h-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="search" className="grow ml-2 outline-none" placeholder="Buscar" />
                        </label>
                        <select defaultValue="Filtros" className="select border rounded-lg p-2 flex-[1]">
                            <option disabled>Filtros</option>
                            <option>Nombre</option>
                            <option>Materia</option>
                        </select>
                    </div>

                    {/* Lista con tamaño fijo y scroll */}
                     <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(4*100px)] overflow-y-auto">
                        <li className="p-4 text-xs opacity-60 tracking-wide">Lista de guías</li>
                        {misGuias.length > 0 ? (
                            misGuias.map((guia) => (
                                <li key={guia.id_gde} className="flex items-center gap-4 h-25 px-3 border-b">
                                    <div className="flex flex-col flex-grow">
                                        <div className="font-semibold text-lg">{guia.nombre}</div>
                                        <p className="text-sm text-gray-600">{guia.descripcion}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => {
                                                const guiaSeleccionada = {
                                                    id: guia.id_gde,
                                                    tipo: guia.tipo,
                                                    nombre: guia.nombre,
                                                    descripcion: guia.descripcion,
                                                    materia: guia.id_materia,
                                                    plan: guia.id_pde,
                                                    version: guia.version,
                                                    estado: guia.estado,
                                                    seguidores: guia.num_seguidores,
                                                };
                                                localStorage.setItem("guia", JSON.stringify(guiaSeleccionada)); // Guardar la guía en localStorage
                                                navigate("/editar-guia", { state: { id_gde: guia.id_gde } });
                                            }}
                                            className="btn btn-square btn-ghost"
                                        >
                                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                    <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path>
                                                </g>
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => navigate("/ver-guia-seguida")}
                                            className="btn btn-square btn-ghost"
                                        >
                                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                    <path d="m4.5 12.75 6 6 9-13.5"></path>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="p-4 text-gray-400 italic">Aún no has creado guías</li>
                        )}
                    </ul>

                    <button onClick={gotoCrearGuias} className="btn btn-primary w-1/3 mx-auto">Crear Guía de Estudio</button>
                </div>
                
                {/* Solicitudes de Guías para Academia */}
                <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-center">Solicitudes de validación</h1>
                    <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(5.5*100px)] overflow-y-auto">
                        {solicitudes.length === 0 ? (
                            <li className='p-4 text-center text-gray-500'>No hay solicitudes pendientes</li>
                        ) : (
                            solicitudes.map((solicitud) => (
                                <li key={solicitud.id_solicitud} className='flex items-center gap-4 p-4 rounded-lg shadow'>
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src={`http://localhost:4000/avatar/imagen?id_usuario=${solicitud.id_usuario}`} 
                                        alt="Perfil"
                                    />
                                    <div className='flex-grow'>
                                        <h3 className='font-semibold text-lg'>
                                            {solicitud.nombre_guia}
                                        </h3>
                                        <p className='text-sm text-gray-400'>
                                            {solicitud.nombre_usuario} {solicitud.apellidos}
                                        </p>
                                        <p className='text-sm text-gray-400'>
                                            {solicitud.descripcion}
                                        </p>
                                    </div>
                                    <button 
                                        className="btn btn-square btn-ghost"
                                        onClick={() => {
                                            const guiaSeleccionada = {
                                                    id: solicitud.id_gde,
                                                    id_solicitud: solicitud.id_solicitud,
                                                    tipo: solicitud.tipo,
                                                    nombre: solicitud.nombre_guia,
                                                    nombre_usuario: solicitud.nombre_usuario,
                                                    apellidos: solicitud.apellidos,
                                                    descripcion: solicitud.descripcion,
                                                    materia: solicitud.nombre_materia,
                                                    academia: solicitud.nombre_academia,
                                                    plan: solicitud.nombre_pde,
                                                    version: solicitud.version,
                                                    estado: solicitud.estado,
                                                    seguidores: solicitud.num_seguidores,
                                                };
                                                localStorage.setItem("guia", JSON.stringify(guiaSeleccionada)); // Guardar la guía en localStorage
                                                navigate("/guiaAcademia", { state: { id_gde: solicitud.id_gde } });
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-4.8 0-9 5.6-9 7.5s4.2 7.5 9 7.5 9-5.6 9-7.5-4.2-7.5-9-7.5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                                        </svg>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            <button onClick={() => navigate('/mis-guias-profesor')} className="btn btn-primary my-8 mx-8">Vista de Profesor</button>
        </div>
    );
}