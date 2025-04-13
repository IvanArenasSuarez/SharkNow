import { useState } from "react";

export default function VerGuia() {
    const [preguntas, setPreguntas] = useState([
        {
            pregunta: "¿Cuál es la capital de Francia?",
            tipo: "Opción Múltiple",
            respuestas: ["Madrid", "Berlín", "París", "Roma"],
            correcta: "París", // Respuesta correcta
            visualizada: false
        },
        {
            pregunta: "La tierra es plana.",
            tipo: "Verdadero o Falso",
            respuestas: ["Falso", "Verdadero"],
            correcta: "Falso", // Respuesta correcta
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
        // Otras preguntas...
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
            <h1 className="text-2xl font-bold text-center mb-6">Detalles del Reporte</h1>

            {/* Imagen del perfil y autor */}
            <div className="flex items-center gap-4 mb-4">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Perfil del usuario" className="w-16 h-16 rounded-full object-cover" />
                <div>
                    <div className="font-semibold text-lg">Autor: Juan Pérez</div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-15">
                {/* Sección de la Guía */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 min-h-[500px]">
                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Nombre de la guía</legend>
                        <div className="text-lg">Guía de Estudio de Matemáticas</div>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Materia</legend>
                        <div className="text-lg">Matemáticas</div>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Academia</legend>
                        <div className="text-lg">Academia de Ciencias</div>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Departamento</legend>
                        <div className="text-lg">Matemáticas Avanzadas</div>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Plan de Estudios</legend>
                        <div className="text-lg">Plan 2024</div>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Versión de la guía</legend>
                        <div className="text-lg">1.0</div>
                    </fieldset>

                    <fieldset>
                        <legend className="font-semibold mb-2 text-lg">Descripción</legend>
                        <div className="text-lg">Esta es una guía completa para estudiar el curso de matemáticas avanzadas.</div>
                    </fieldset>
                </div>

                {/* Lista de Preguntas */}
                <div className="w-full lg:w-1/2 h-[500px] overflow-y-auto">
                    <ul className="bg-base-100 rounded-box shadow-md h-full overflow-y-auto">
                        <li className="p-4 text-xs opacity-60 tracking-wide font-semibold">Lista de Preguntas</li>

                        {preguntas.map((pregunta, index) => (
                            <li
                            key={index}
                            className={`flex items-center gap-4 px-3 border-b py-2 ${pregunta.visualizada ? "bg-green-700" : ""}`}
                        >
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

            {/* Botones debajo de la lista de preguntas */}
            <div className="flex justify-between gap-4 mt-6">
                <button
                    className="btn btn-primary w-1/3 h-14 min-w-[120px]"
                    disabled={!todasVistas}
                    onClick={() => navigate('/reportes')} 
                >
                    Notificar por cambios
                </button>
                <button
                    className="btn btn-accent w-1/3 h-14 min-w-[120px]"
                    disabled={!todasVistas}
                    onClick={() => navigate('/reportes')}
                >
                    Eliminar guía
                </button>
            </div>

            {/* Botón Rechazar reporte */}
            <div className="mt-4">
                <button
                    className="btn btn-danger w-full h-14 min-w-[120px]"
                    disabled={!todasVistas}
                    onClick={() => navigate('/reportes')}
                >
                    Rechazar reporte
                </button>
            </div>
        

            {/* Popup de detalle de la pregunta */}
            {/* Estilo del popup con colores más acordes a la página */}
{popupVisible && selectedQuestion && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-base-100 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Pregunta: {selectedQuestion.pregunta}</h2>

            {/* Mostrar respuestas dependiendo del tipo de pregunta */}
            <div className="mb-4">
                {selectedQuestion.tipo === "Verdadero o Falso" ? (
                    <p className="font-semibold">Respuesta correcta: {selectedQuestion.correcta}</p>
                ) : selectedQuestion.tipo === "Opción Múltiple" ? (
                    <ul className="list-disc pl-5">
                        {selectedQuestion.respuestas.map((respuesta, idx) => (
                            <li key={idx} className="text-sm text-white">
                                {respuesta === selectedQuestion.correcta ? (
                                    <span className="font-bold">* {respuesta}</span>
                                ) : (
                                    respuesta
                                )}
                            </li>
                        ))}
                    </ul>
                ) : selectedQuestion.tipo === "Relación de Columnas" ? (
                    <div>
                        <p className="font-semibold">Relaciona las siguientes columnas:</p>
                        <ul className="list-disc pl-5">
                            {selectedQuestion.respuestas.map((respuesta, idx) => (
                                <li key={idx} className="text-sm text-white">
                                    {respuesta.columna1} - {respuesta.columna2}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>

            <button
                onClick={closePopup}
                className="btn btn-secondary w-full mt-4"
            >
                Cerrar
            </button>
        </div>
    </div>
)}

        </div>
    );
}