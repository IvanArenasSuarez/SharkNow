import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';

const EditarPregunta = forwardRef(({ id, title, modo, preguntaData = null }, ref) => {
    const initialData = {
        type: "Opción múltiple",
        question: "",
        options: [],
        answer: ""
    };

    const [tipoPregunta, setTipoPregunta] = useState(initialData.type);
    const [textoPregunta, setTextoPregunta] = useState(initialData.question);
    const [opciones, setOpciones] = useState(initialData.options);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(initialData.answer);

    const inicializarOpciones = (type) => {
        switch (type) {
            case "Opción múltiple":
                return ["", "", "", ""];
            case "Verdadero o Falso":
                return ["Verdadero", "Falso"];
            case "Relación de columnas":
                return Array(5).fill().map(() => ({ izquierda: "", derecha: "" }));
            default:
                return [];
        }
    };

    useEffect(() => {
        if (modo === "editar" && preguntaData) {
            setTipoPregunta(preguntaData.type || initialData.type);
            setTextoPregunta(preguntaData.question || initialData.question);
            setOpciones(preguntaData.options || initialData.options);
            setRespuestaCorrecta(preguntaData.answer ?? initialData.answer);
        } else {
            setTextoPregunta(initialData.question);
            setOpciones(inicializarOpciones(tipoPregunta));
            setRespuestaCorrecta(initialData.answer);
        }
    }, [modo, preguntaData, tipoPregunta]);

    useImperativeHandle(ref, () => ({
        openModal: () => {
            document.getElementById(id)?.showModal();
        },
        closeModal: () => {
            document.getElementById(id)?.close();
        }
    }));

    const handleClose = () => {
        document.getElementById(id).close();
    };

    const handleTipoPreguntaChange = (e) => {
        const nuevoTipo = e.target.value;
        setTipoPregunta(nuevoTipo);

        if (modo === "crear") {
            setOpciones(inicializarOpciones(nuevoTipo));
            setRespuestaCorrecta(initialData.answer);
        }
    };

    const handleImageClick = (option) => (e) => {
        e.stopPropagation();
        console.log(`Añadir imagen a: ${option}`);
    };

    const guardarEnLocalStorage = () => {
        const nuevaPregunta = {
            type: tipoPregunta,
            question: textoPregunta,
            options: opciones,
            answer: respuestaCorrecta
        };

        const dataActual = JSON.parse(localStorage.getItem("preguntas")) || { nuevas: [] };
        dataActual.nuevas.push(nuevaPregunta);
        localStorage.setItem("preguntas", JSON.stringify(dataActual));
        handleClose();
    };

    const photoIcon = "M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10m18 0-4.5-6-3.5 4.5-2.5-3L3 15m18 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m10-6h.01";

    return (
        <dialog id={id} className="modal">
            <div className="modal-box w-full max-w-3xl p-6">
                <h3 className="font-bold text-lg text-center mb-4">{title}</h3>

                <form className="flex flex-col gap-6">
                    <div className="flex gap-4">
                        <select value={tipoPregunta} onChange={handleTipoPreguntaChange} className="select flex-1">
                            <option>Opción múltiple</option>
                            <option>Verdadero o Falso</option>
                            <option>Relación de columnas</option>
                        </select>
                        <div className="flex items-center gap-2 flex-1">
                            <input type="text" value={textoPregunta} onChange={(e) => setTextoPregunta(e.target.value)} className="input w-full" />
                            <button type="button" className="btn btn-square btn-ghost" onClick={handleImageClick("Pregunta")}>
                                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                        <path d={photoIcon} />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {tipoPregunta === "Opción múltiple" && (
                        <div className="grid grid-cols-2 gap-4">
                            {opciones.map((opcion, idx) => (
                                <div key={idx} className="flex flex-col gap-2 border p-3 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="radio-1"
                                            className="radio"
                                            checked={respuestaCorrecta === opcion}
                                            onChange={() => setRespuestaCorrecta(opcion)}
                                        />
                                        <span className="font-semibold">Opción {idx + 1}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            className="input flex-1"
                                            value={opcion}
                                            placeholder={`Texto opción ${idx + 1}`}
                                            onChange={(e) => {
                                                const nuevas = [...opciones];
                                                nuevas[idx] = e.target.value;
                                                setOpciones(nuevas);
                                                if (respuestaCorrecta === opcion) {
                                                    setRespuestaCorrecta(e.target.value);
                                                }
                                            }}
                                        />
                                        <button type="button" className="btn btn-square btn-ghost" onClick={handleImageClick(`Opción ${idx + 1}`)}>
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
                            {opciones.map((opcion, idx) => (
                                <div key={idx} className="flex flex-col gap-2 border p-3 rounded-lg shadow-sm flex-1">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="radio-1"
                                            className="radio"
                                            checked={respuestaCorrecta === opcion}
                                            onChange={() => setRespuestaCorrecta(opcion)}
                                        />
                                        <span className="font-semibold">{opcion}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {tipoPregunta === "Relación de columnas" && (
                        <div className="flex flex-col gap-3">
                            {opciones.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 flex-1">
                                        <input
                                            type="text"
                                            placeholder={`Columna 1 - Item ${idx + 1}`}
                                            className="input w-full"
                                            value={item.izquierda}
                                            onChange={(e) => {
                                                const nuevas = [...opciones];
                                                nuevas[idx].izquierda = e.target.value;
                                                setOpciones(nuevas);
                                            }}
                                        />
                                        <button type="button" className="btn btn-square btn-ghost" onClick={handleImageClick(`Columna 1 - Item ${idx + 1}`)}>
                                            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                    <path d={photoIcon} />
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                    <span className="text-lg font-semibold">→</span>
                                    <div className="flex items-center gap-2 flex-1">
                                        <input
                                            type="text"
                                            placeholder={`Columna 2 - Item ${idx + 1}`}
                                            className="input w-full"
                                            value={item.derecha}
                                            onChange={(e) => {
                                                const nuevas = [...opciones];
                                                nuevas[idx].derecha = e.target.value;
                                                setOpciones(nuevas);
                                            }}
                                        />
                                        <button type="button" className="btn btn-square btn-ghost" onClick={handleImageClick(`Columna 2 - Item ${idx + 1}`)}>
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
                        <button className="btn btn-primary" type="button" onClick={guardarEnLocalStorage}>
                            {modo === "editar" ? "Editar" : "Agregar Pregunta"}
                        </button>
                        <button className="btn btn-secondary" type="button" onClick={handleClose}>
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
});

export default EditarPregunta;
