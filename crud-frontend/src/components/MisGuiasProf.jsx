import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MisGuiasProf() {
    const navigate = useNavigate();
    const gotoCrearGuias = () => navigate('/crear-guia');

    const [misGuias, setMisGuias] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);

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
                const response = await fetch("http://localhost:4000/guias/solicitudes/prof", {
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
                                    <img className="w-12 h-12 rounded-full" src="https://img.daisyui.com/images/profile/demo/1@94.webp" alt="Perfil" />
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
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="p-4 text-gray-400 italic">Aún no has creado guías</li>
                        )}
                    </ul>

                    <button onClick={gotoCrearGuias} className="btn btn-primary w-1/3 mx-auto">Crear Guía de Estudio</button>
                </div>
                
                {/* Guías para Academia */}
                <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-center">Guías para Academia</h1>
                    <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(5*100px)] overflow-y-auto">
                        {solicitudes.length === 0 ? (
                            <li className='p-4 text-center text-gray-500'>No hay guías pendientes</li>
                        ) : (
                          solicitudes
                            .filter((solicitud) => solicitud.estado !== 'A')
                            .map((solicitud) => {
                                const esRechazada = solicitud.estado === 'R';
                                const enRevision = solicitud.estado === 'E';

                                const handleClick = () => {
                                    if (esRechazada) {
                                        const guiaSeleccionada = {
                                            id: solicitud.id_gde,
                                            tipo: solicitud.tipo,
                                            nombre: solicitud.nombre,
                                            descripcion: solicitud.descripcion,
                                            materia: solicitud.id_materia,
                                            plan: solicitud.id_pde,
                                            version: solicitud.version,
                                            estado: solicitud.guia_estado,
                                            seguidores: solicitud.num_seguidores,
                                        };
                                        console.table(guiaSeleccionada);
                                        localStorage.setItem("guia", JSON.stringify(guiaSeleccionada)); // Guardar la guía en localStorage
                                        navigate("/editar-guia", { state: { id_gde: solicitud.id_gde } });
                                    }
                                };

                                return (
                                    <li
                                        key={solicitud.id_solicitud}
                                        onClick={handleClick}
                                        className={`flex items-center gap-4 h-auto px-3 py-4 border-b rounded transition ${esRechazada ? 'cursor-pointer hover:bg-red-50' : ''}`}
                                    >
                                        <img className='w-12 h-12 rounded-full'
                                            src="https://img.daisyui.com/images/profile/demo/1@94.webp" 
                                            alt='Perfil'
                                        />
                                        <div className='flex flex-col flex-grow'>
                                            <div className='font-semibold text-lg'>
                                                {solicitud.nombre}
                                            </div>
                                            <p className='text-sm text-grau-600'>
                                                Estado:{" "}
                                                <span className={`font-bold ${
                                                    esRechazada ? 'text-red-500' : 'text-yellow-500'
                                                }`}>
                                                    {esRechazada ? 'Rechazada' : 'En Revisión'}
                                                </span>
                                                {esRechazada && (
                                                    <span className='ml-2 text-xs text-red-500 font-semibold'>
                                                        (Modificar)
                                                    </span>
                                                )}
                                            </p>
                                            {esRechazada && (
                                                <p className='text-xs text-red-400 mt-1'>
                                                    📌 Motivo del rechazo: {solicitud.motivo_de_rechazo}
                                                </p>
                                            )}
                                        </div>
                                    </li>
                                )
                            })  
                        )}
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}