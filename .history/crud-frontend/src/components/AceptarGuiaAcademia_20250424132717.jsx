import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function AceptarGuiaAcademia() {
    const navigate = useNavigate();

    // Información de la guía
    const infoGuia = {
        nombre: "Guía de Estudio de Matemáticas",
        autor: "Prof. Juan Pérez",
        tipo: "Curricular",
        materia: "Matemáticas",
        academia: "Academia de Ciencias",
        progAcad: "Matemáticas Avanzadas",
        planDEst: "Plan 2024",
        version: "1.0",
        desc: "Esta es una guía completa para estudiar el curso de matemáticas avanzadas.",
    };

    // Estado de las preguntas de la guía
    const [preguntas, setPreguntas] = useState([
        {
            pregunta: "¿Cuál es la capital de Francia?",
            tipo: "Opción Múltiple",
            respuestas: ["Madrid", "Berlín", "París", "Roma"],
            correcta: "París",
            visualizada: false
        },
        {
            pregunta: "La tierra es plana.",
            tipo: "Verdadero o Falso",
            respuestas: ["Falso", "Verdadero"],
            correcta: "Falso",
            visualizada: false
        },
        {
            pregunta: "Relaciona las capitales con sus países.",
            tipo: "Relación de Columnas",
            respuestas: [
                { columna1: "Francia", columna2: "París" },
                { columna1: "Alemania", columna2: "Berlín" },
                { columna1: "Italia", columna2: "Roma" },
                { columna1: "España", columna2: "Madrid" }
            ],
            correcta: [
                { columna1: "Francia", columna2: "París" },
                { columna1: "Alemania", columna2: "Berlín" },
                { columna1: "Italia", columna2: "Roma" },
                { columna1: "España", columna2: "Madrid" }
            ],
            visualizada: false
        },
    ]);

    const [todasVistas, setTodasVistas] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const eyeIcon = "M12 4.5C9.61 4.5 7.47 5.46 6 7c-1.47-1.54-3.61-2.5-6-2.5 2.39 0 4.73 1.46 6 3 1.47-1.54 3.61-3 6-3 2.39 0 4.73 1.46 6 3-1.47-1.54-3.61-2.5-6-2.5zm0 12c-2.39 0-4.73-1.46-6-3-1.47 1.54-3.61 3-6 3 2.39 0 4.73-1.46 6-3 1.47 1.54 3.61 3 6 3zm0-4c-2.39 0-4.73-1.46-6-3-1.47 1.54-3.61 3-6 3 2.39 0 4.73-1.46 6-3 1.47 1.54 3.61 3 6 3z";

    const handleEyeClick = (index) => {
        const newPreguntas = [...preguntas];
        newPreguntas[index].visualizada = true;
        setPreguntas(newPreguntas);

        if (newPreguntas.every((pregunta) => pregunta.visualizada)) {
            setTodasVistas(true);
        }

        setSelectedQuestion(newPreguntas[index]);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedQuestion(null);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Evaluar Guía de Estudio por Academia</h1>

            <div className="flex flex-col lg:flex-row gap-15">
                {/* Información de la guía */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 min-h-[500px]">
                    <div className="bg-base-100 rounded-box shadow-md p-4 space-y-2">
                        <h2 className="text-xl font-bold mb-4">Información de la Guía</h2>
                        <ul className="space-y-2">
                            <li><strong>Nombre: </strong>{infoGuia.nombre}</li>
                            <li><strong>Autor: </strong>{infoGuia.autor}</li>
                            {infoGuia.tipo === "Curricular" && (
                                <>
                                    <li><strong>Materia: </strong>{infoGuia.materia}</li>
                                    <li><strong>Academia: </strong>{infoGuia.academia}</li>
                                    <li><strong>Programa Académico: </strong>{infoGuia.progAcad}</li>
                                    <li><strong>Plan de Estudio: </strong>{infoGuia.planDEst}</li>
                                    <li><strong>Versión de la guía: </strong>{infoGuia.version}</li>
                                </>
                            )}
                            <li>
                                <strong>Descripción: </strong>
                                <p className="text-gray-300 max-h-40 overflow-y-auto">{infoGuia.desc}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Lista de Preguntas */}
                <div className="w-full lg:w-1/2 h-[500px] overflow-y-auto">
                    <ul className="bg-base-100 rounded-box shadow-md h-full overflow-y-auto">
                        <li className="p-4 text-xs opacity-60 tracking-wide font-semibold">Lista de Preguntas</li>

                        {preguntas.map((pregunta, index) => (
                            <li key={index} className={`flex items-center gap-4 px-3 border-b py-2 ${pregunta.visualizada ? "bg-green-700" : ""}`}>
                                <div className="flex flex-col flex-grow">
                                    <div className="font-semibold text-lg">{pregunta.pregunta}</div>
                                    <p className="text-sm text-gray-600">{pregunta.tipo}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEyeClick(index)}
                                        className="btn btn-square btn-ghost"
                                    >
                                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d={eyeIcon}></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Botones de Aceptar o Rechazar */}
            <div className="flex justify-between gap-4 mt-6">
                <button
                    className="btn btn-primary w-1/3 h-14 min-w-[120px]"
                    disabled={!todasVistas}
                    onClick={() => navigate('/reportes')}
                >
                    Aceptar y Publicar
                </button>
                <button
                    className="btn btn-accent w-1/3 h-14 min-w-[120px]"
                    onClick={() => document.getElementById('rechazarGuia').showModal()}
                >
                    Rechazar
                </button>
            </div>

            {/* Popup de Rechazo */}
            <dialog id="rechazarGuia" className="modal">
                <div className="modal-box w-full max-w-xl text-center">
                    <h3 className="font-bold text-2xl mb-4">Rechazar Guía</h3>
                    <p className="text-lg mb-2">Motivo del rechazo</p>

                    <textarea 
                        className="textarea textarea-bordered w-full mb-6" 
                        placeholder="Escriba el motivo aquí..."
                        rows={4}
                    ></textarea>

                    <div className="flex justify-center gap-4">
                        <button 
                            className="btn btn-error px-6"
                            onClick={() => {
                                navigate("/");
                                console.log("Rechazado con motivo");
                                document.getElementById('rechazarGuia').close();
                            }}
                        >
                            Rechazar
                        </button>

                        <form method="dialog">
                            <button className="btn btn-ghost px-6">Cancelar</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Popup de detalle de la pregunta */}
            {popupVisible && selectedQuestion && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Pregunta: {selectedQuestion.pregunta}</h2>

                        <div className="mb-4">
                            {selectedQuestion.tipo === "Verdadero o Falso" ? (
                                <div>
                                    <div className="font-semibold">Respuesta correcta:</div>
                                    <div>{selectedQuestion.correcta}</div>
                                </div>
                            ) : selectedQuestion.tipo === "Opción Múltiple" ? (
                                <div>
                                    <div className="font-semibold">Respuestas:</div>
                                    <ul className="list-disc pl-5">
                                        {selectedQuestion.respuestas.map((respuesta, idx) => (
                                            <li key={idx} className="text-sm text-white">
                                                {respuesta === selectedQuestion.correcta ? (
                                                    <span className="text-green-500">{respuesta}</span>
                                                ) : (
                                                    respuesta
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : selectedQuestion.tipo === "Relación de Columnas" && (
                                <div>
                                    <div className="font-semibold">Relaciona las siguientes:</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedQuestion.respuestas.map((item, idx) => (
                                            <div key={idx}>
                                                <div>{item.columna1} - {item.columna2}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4">
                            <button 
                                className="btn btn-primary"
                                onClick={closePopup}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}