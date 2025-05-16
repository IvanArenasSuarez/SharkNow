import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MisGuiasProf() {
    const navigate = useNavigate();
    const gotoCrearGuias = () => navigate('/crear-guia');

    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-6">
            <h1 className="text-4xl font-bold text-center mb-6 w-full">Guías de Estudio</h1>
            <div className="flex flex-col lg:flex-row justify-between gap-6 w-full max-w-7xl">
                {/* Mis Guías */}
                <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-center">Mis Guías</h1>

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
                        {[...Array(6)].map((_, index) => (
                            <li key={index} className="flex items-center gap-4 h-25 px-3 border-b">
                                <img className="w-12 h-12 rounded-full" src="https://img.daisyui.com/images/profile/demo/1@94.webp" alt="Perfil" />
                                <div className="flex flex-col flex-grow">
                                    <div className="font-semibold text-lg">Dio Lupa {index + 1}</div>
                                    <p className="text-sm text-gray-600">
                                        "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth.
                                    </p>
                                </div>
                                {/* Botones con íconos originales */}
                                <div className="flex gap-2">
                                    <button 
                                    onClick={() => navigate("/editar-guia")}
                                    className="btn btn-square btn-ghost">
                                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button onClick= {gotoCrearGuias}className="btn btn-primary w-1/3 mx-auto">Crear Guía de Estudio</button>
                </div>
                
                {/* Solicitudes de Guías para Academia */}
                <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-center">Solicitudes de validación</h1>
                    <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(5.5*100px)] overflow-y-auto">
                        <li className="p-4 text-xs opacity-60 tracking-wide"></li>
                        {[...Array(7)].map((_, index) => (
                            <li key={index} className="flex items-center gap-4 p-4 rounded-lg shadow">
                            <img
                              className="w-12 h-12 rounded-full"
                              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                              alt="Perfil"
                            />
                            <div className="flex-grow">
                              <h3 className="font-semibold text-lg">ETS Introduccion a microcontroladores v{index + 1}</h3>
                              <p className="text-sm text-gray-400"> M. en C. José Juan.</p>
                              <p className="text-sm text-gray-400">Descripción breve de la guía.</p>
                            </div>
                            
                            <button className="btn btn-square btn-ghost"
                            onClick={() => navigate("/guiaAcademia")}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-4.8 0-9 5.6-9 7.5s4.2 7.5 9 7.5 9-5.6 9-7.5-4.2-7.5-9-7.5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                              </svg>
                            </button>
                          </li>
                        ))}
                    
                    </ul>
                </div>
            </div>
        </div>
    );
}