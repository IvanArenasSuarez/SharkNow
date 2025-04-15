import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function VerGuiaSeguida() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("Lógica básica de algoritmia");
    const [autor, setAutor] = useState("Salvador Arredondo Carbajal");
    const [materia, setMateria] = useState("Fundamentos de Programación");
    const [academia, setAcademia] = useState("Algoritmia y Programación");
    const [progAcad, setProgAcad] = useState("ISC");
    const [planDEst, setPlanDEst] = useState("ISC(2009)");
    const [version, setVersion] = useState("1");
    const [desc, setDesc] = useState(
        "Guía de estudio que contiene preguntas básicas para desarrollar la lógica de los algoritmos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper."
    );
    const [tipo, setTipo] = useState("Curricular"); // Puede ser "Curricular" o "Extracurricular"

    const horas = Array.from({ length: 25 }, (_, i) => i);
    const minutos = Array.from({ length: 60 }, (_, i) => i);
    
    return (
        <div className="max-w-6xl mx-auto p-10 space-y-12 text-lg">
            {/* Primera Fila - 2 Columnas */}
            <div className="grid grid-cols-2 gap-10">
                {/* Columna Izquierda - Información de la Guía */}
                <div className="border border-gray-500 p-8 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">Información de la Guía</h2>
                    <ul className="space-y-4">
                        <li><strong>Nombre: </strong>{nombre}</li>
                        <li><strong>Autor: </strong>{autor}</li>
                        {tipo === "Curricular" && (
                            <>
                                <li><strong>Materia: </strong>{materia}</li>
                                <li><strong>Academia: </strong>{academia}</li>
                                <li><strong>Programa Académico: </strong>{progAcad}</li>
                                <li><strong>Plan de Estudio: </strong>{planDEst}</li>
                                <li><strong>Versión de la guía: </strong>{version}</li>
                            </>
                        )}
                        <li><strong>Descripción: </strong>
                            <p className="text-gray-300 max-h-40 overflow-y-auto">{desc}</p>
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
                            <input type="date" className="input input-lg w-full" id="inicio"/>
                        </div>
                        <div className="space-y-2">
                            <strong>Final:</strong>
                            <input type="date" className="input input-lg w-full" id="fin"/>
                        </div>
                    </div>

                    {/* Días de Estudio */}
                    <div className="mb-6">
                        <strong>Días a estudiar:</strong>
                        <div className="grid grid-cols-3 gap-x-6 gap-y-4 mt-4">
                            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia, index) => (
                                <label key={index} className="flex items-center space-x-3">
                                    <input type="checkbox" className="checkbox checkbox-lg checkbox-info" id={dia.toLowerCase()} />
                                    <span>{dia}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Hora de Notificación */}
                    <div className="flex justify-center gap-12 mb-6">
                        <label className="flex flex-col items-center space-y-2">
                            <strong>Hora:</strong>
                            <select className="select select-lg">
                                {horas.map((hora) => (
                                    <option key={hora} value={hora}>
                                        {hora.toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="flex flex-col items-center space-y-2">
                            <strong>Minutos:</strong>
                            <select className="select select-lg">
                                {minutos.map((minuto) => (
                                    <option key={minuto} value={minuto}>
                                        {minuto.toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {/* Botones de Opinión */}
                    <div className="flex justify-center gap-12 mt-8">
                        <div className="flex flex-col items-center">
                            <button className="btn btn-lg btn-square btn-ghost" id="meSirve">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            </button>
                            <span className="mt-2">Me Sirve</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <button className="btn btn-lg btn-square btn-ghost" id="seguir">
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
                <button className="btn btn-lg btn-primary " onClick={() => navigate('/quiz-guia')}>Comenzar Sesión</button>
                <button className="btn btn-lg btn-accent" onClick={() => navigate('/mis-guias')}>Salir y Guardar</button>
                <button className="btn btn-lg btn-error" onClick={() => navigate('/reporte')}>Reportar</button>
            </div>
        </div>
    );
}
