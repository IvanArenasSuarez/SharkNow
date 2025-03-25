import { useState } from "react";
import EditarPregunta from "./EditarPregunta";

export default function EditarGuia() {
    const [preguntas, setPreguntas] = useState([
        "Pregunta 1",
        "Pregunta 2",
        "Pregunta 3",
        "Pregunta 4",
        "Pregunta 5",
        "Pregunta 6"
    ]);

    const checkIcon = "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125";
    const deleteIcon = "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z";
    const addIcon = "M12 4.5v15m7.5-7.5h-15";
    
    const agregarPregunta = () => {
        const nuevaPregunta = `Pregunta ${preguntas.length + 1}`;
        setPreguntas([...preguntas, nuevaPregunta]);
    };

    const [tipoPregunta, setTipoPregunta] = useState("Opción Multiple");

    const handleTipoPreguntaChange = (e) => {
        setTipoPregunta(e.target.value);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Editar Guía de Estudio</h1>

            <div className="flex flex-col lg:flex-row gap-15">
                
                {/* Sección del Formulario */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 min-h-[500px]">
                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Nombre de la guia</legend>
                        <input type="text" className="input text-lg w-full" />
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Materia</legend>
                        <select className="select w-full" disabled>
                            <option>You can't touch this</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Academia</legend>
                        <select className="select w-full" disabled>
                            <option>You can't touch this</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Departamento</legend>
                        <select className="select w-full" disabled>
                            <option>You can't touch this</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Plan de Estudios</legend>
                        <select className="select w-full" disabled>
                            <option>You can't touch this</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Versión de guía de estudio</legend>
                        <select className="select w-full" disabled>
                            <option>You can't touch this</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Descripción</legend>
                        <textarea className="textarea text-lg flex-1 min-h-[150px] w-full" placeholder="Escribe una descripción"></textarea>
                    </fieldset>

                    <div className="flex justify-between gap-4">
                        <button className="btn btn-primary w-1/3 h-14 min-w-[120px]">Publicar</button>
                        <button className="btn btn-accent w-1/3 h-14 min-w-[120px]">Guardar y Salir</button>
                        <button className="btn btn-secondary w-1/3 h-14 min-w-[120px]">Eliminar</button>
                    </div>
                </div>

                {/* Lista de Preguntas - Ahora con altura fija y scroll */}
                <div className="w-full lg:w-1/2">
                    <ul className="bg-base-100 rounded-box shadow-md h-[800px] overflow-y-auto">
                        <li className="p-4 text-xs opacity-60 tracking-wide font-semibold">Lista de Preguntas</li>
                        
                        {preguntas.map((pregunta, index) => (
                            <li key={index} className="flex items-center gap-4 px-3 border-b py-2">
                                <div className="flex flex-col flex-grow">
                                    <div className="font-semibold text-lg">{pregunta}</div>
                                    <p className="text-sm text-gray-600">Esta es una descripción de {pregunta}.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                    onClick={() => navigate("/editar-pregunta")}
                                    className="btn btn-square btn-ghost">
                                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d={checkIcon}></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button className="btn btn-square btn-ghost">
                                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d={deleteIcon} />
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}

                        {/* Botón para añadir preguntas */}
                        <li className="flex justify-center py-4">
                            <EditarPregunta id = "agregar_pregunta" title = "Agregar Pregunta"></EditarPregunta>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
