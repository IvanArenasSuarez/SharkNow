import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MisGuias() {
    const navigate = useNavigate();
    const [misGuias, setMisGuias] = useState([]);
    const [guiasSeguidas, setGuiasSeguidas] = useState([]);

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
        const fetchGuiasSeguidas = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:4000/guias/seguidas', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setGuiasSeguidas(data);
                } else {
                    console.error("Error:", data.message);
                }
            } catch (err) {
                console.error("Error al obtener las guias seguidas: ", err);
            }
        };
        fetchGuiasSeguidas();
    }, []);

    const gotoCrearGuias = () => {
        navigate('/crear-guia');
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-6">
            <h1 className="text-4xl font-bold text-center mb-6 w-full">Guías de Estudio</h1>
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
                                            onClick={() => {
                                                const guiaSeleccionada = {
                                                    id: guia.id_gde,
                                                    tipo: guia.tipo,
                                                    nombre: guia.nombre,
                                                    usuario: guia.nombre_usuario,
                                                    apellidos: guia.apellidos,
                                                    descripcion: guia.descripcion,
                                                    materia: guia.nombre_materia,
                                                    academia: guia.nombre_academia,
                                                    plan: guia.nombre_pde,
                                                    version: guia.version,
                                                    estado: guia.estado,
                                                    seguidores: guia.num_seguidores,
                                                };
                                                localStorage.setItem("guia", JSON.stringify(guiaSeleccionada)); // Guardar la guía en localStorage
                                                navigate("/ver-guia-seguida", { state: { id_gde: guia.id_gde } })
                                            }}
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

                {/* Guías Seguidas (sin lógica aún) */}
                <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-center">Guías Seguidas</h1>
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

                    <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(4*100px)] overflow-y-auto">
                        <li className="p-4 text-xs opacity-60 tracking-wide">Lista de guías seguidas</li>
                        {guiasSeguidas.length > 0 ? (
                            guiasSeguidas.map((seguidas) => (
                                <li key={seguidas.id_gde} className="flex items-center gap-4 h-25 px-3 border-b">
                                    <img className="w-12 h-12 rounded-full" src={`http://localhost:4000/avatar/imagen?id_usuario=${seguidas.id_usuario}`} alt="Perfil" />
                                    <div className="flex flex-col flex-grow">
                                        <div className="font-semibold text-lg">{seguidas.nombre_gde}</div>
                                        <p className="text-sm text-gray-600">{seguidas.descripcion}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => {
                                               const guiaSeleccionada = {
                                                    id: seguidas.id_gde,
                                                    id_usuario: seguidas.id_usuario,
                                                    tipo: seguidas.tipo,
                                                    nombre: seguidas.nombre_gde,
                                                    usuario: seguidas.nombre_usuario,
                                                    apellidos: seguidas.apellidos,
                                                    descripcion: seguidas.descripcion,
                                                    materia: seguidas.nombre_materia,
                                                    academia: seguidas.nombre_academia,
                                                    plan: seguidas.nombre_pde,
                                                    version: seguidas.version,
                                                    estado: seguidas.estado,
                                                    seguidores: seguidas.num_seguidores,
                                                };
                                                localStorage.setItem("guia", JSON.stringify(guiaSeleccionada)); // Guardar la guía en localStorage
                                                navigate("/ver-guia-seguida", { state: { id_gde: seguidas.id_gde } })}
                                            } 
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
                </div>
            </div>
        </div>
    );
}