import React, { useState } from 'react';

export default function EditarPregunta({ id, title }) {
    const [tipoPregunta, setTipoPregunta] = useState("Opción múltiple");

    const handleOpen = () => {
        document.getElementById(id).showModal();
    };

    const handleClose = () => {
        document.getElementById(id).close();
    };

    const handleTipoPreguntaChange = (e) => {
        setTipoPregunta(e.target.value);
    };

    const handleImageClick = (option) => (e) => {
        e.stopPropagation();
        console.log(`Añadir imagen a: ${option}`);
    };

    const photoIcon = "M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10m18 0-4.5-6-3.5 4.5-2.5-3L3 15m18 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m10-6h.01";

    return (
        <>
            <button className="btn btn-outline btn-primary w-3/4 h-12" onClick={handleOpen}>
                + Añadir Pregunta
            </button>

            <dialog id={id} className="modal">
                <div className="modal-box w-full max-w-3xl p-6">
                    <h3 className="font-bold text-lg text-center mb-4">{title}</h3>

                    <form className="flex flex-col gap-6">
                        
                        {/* Select y Pregunta */}
                        <div className="flex gap-4">
                            <select value={tipoPregunta} onChange={handleTipoPreguntaChange} className="select flex-1">
                                <option>Opción múltiple</option>
                                <option>Verdadero o Falso</option>
                                <option>Relación de columnas</option>
                            </select>
                            <div className="flex items-center gap-2 flex-1">
                                <input type="text" placeholder="Escribe tu pregunta aquí" className="input w-full" />
                                <button type="button" className="btn btn-square btn-ghost" onClick={handleImageClick("Pregunta")}>
                                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                            <path d={photoIcon} />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Renderizado condicional según el tipo de pregunta */}
                        {tipoPregunta === "Opción múltiple" && (
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map(num => (
                                    <div key={num} className="flex flex-col gap-2 border p-3 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <input type="radio" name="radio-1" className="radio" />
                                            <span className="font-semibold">Opción {num}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="text" placeholder={`Texto opción ${num}`} className="input flex-1" />
                                            <button type="button" className="btn btn-square btn-ghost" onClick={handleImageClick(`Opción ${num}`)}>
                                                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                        <path d={photoIcon} />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {tipoPregunta === "Verdadero o Falso" && (
                            <div className="flex gap-4">
                                {["Verdadero", "Falso"].map((opcion, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 border p-3 rounded-lg shadow-sm flex-1">
                                        <div className="flex items-center gap-2">
                                            <input type="radio" name="radio-1" className="radio" />
                                            <span className="font-semibold">{opcion}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {tipoPregunta === "Relación de columnas" && (
                            <div className="flex flex-col gap-3">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <div key={num} className="flex items-center gap-4">
                                        {/* Columna 1 */}
                                        <div className="flex items-center gap-2 flex-1">
                                            <input type="text" placeholder={`Columna 1 - Item ${num}`} className="input w-full" />
                                            <button type="button" className="btn btn-square btn-ghost" onClick={handleImageClick(`Columna 1 - Item ${num}`)}>
                                                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                        <path d={photoIcon} />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                        {/* Flecha */}
                                        <span className="text-lg font-semibold">→</span>
                                        {/* Columna 2 */}
                                        <div className="flex items-center gap-2 flex-1">
                                            <input type="text" placeholder={`Columna 2 - Item ${num}`} className="input w-full" />
                                            <button type="button" className="btn btn-square btn-ghost" onClick={handleImageClick(`Columna 2 - Item ${num}`)}>
                                                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                        <path d={photoIcon} />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end gap-4 mt-4">
                            <button className="btn btn-primary">Agregar Pregunta</button>
                            <button className="btn btn-secondary" type="button" onClick={handleClose}>
                                Cerrar
                            </button>
                        </div>

                    </form>
                </div>
            </dialog>
        </>
    );
}
