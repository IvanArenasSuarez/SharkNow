import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';

const EditarPregunta = forwardRef(({id, title, modo, preguntaData = null}, ref) => {

    const initialData = {
        tipo: "Opción múltiple",
        texto: "",
        opciones: [],
        respuestaCorrecta: 0
    };

    const [tipoPregunta, setTipoPregunta] = useState(preguntaData?.tipo || initialData.tipo);
    const [textoPregunta, setTextoPregunta] = useState(initialData.texto);
    const [opciones, setOpciones] = useState(initialData.opciones);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(initialData.respuestaCorrecta);

    // Cargar preguntas desde localStorage cuando el componente se monta
    useEffect(() => {
        const preguntasGuardadas = JSON.parse(localStorage.getItem("preguntas")) || [];
        if (preguntaData?.id) {
            // Si estamos en modo editar, busca la pregunta por ID
            const pregunta = preguntasGuardadas.find(p => p.id === preguntaData.id);
            if (pregunta) {
                setTipoPregunta(pregunta.tipo);
                setTextoPregunta(pregunta.texto);
                setOpciones(pregunta.opciones);
                setRespuestaCorrecta(pregunta.respuestaCorrecta);
            }
        }
    }, [preguntaData]);

    // Guardar las preguntas en localStorage
    const guardarPregunta = () => {
        const preguntasGuardadas = JSON.parse(localStorage.getItem("preguntas")) || [];
        
        const nuevaPregunta = {
            id: preguntaData?.id || Date.now(),  // Usa el id de la pregunta si existe, o crea uno nuevo
            tipo: tipoPregunta,
            texto: textoPregunta,
            opciones: opciones,
            respuestaCorrecta: respuestaCorrecta,
            pairs: tipoPregunta === "Relación de columnas" ? opciones : []  // Solo agrega pairs si es el tipo "Relación de columnas"
        };

        if (modo === "editar") {
            // Reemplazar la pregunta existente si está en modo editar
            const index = preguntasGuardadas.findIndex(p => p.id === nuevaPregunta.id);
            if (index !== -1) {
                preguntasGuardadas[index] = nuevaPregunta;
            }
        } else {
            // Agregar la nueva pregunta si está en modo crear
            preguntasGuardadas.push(nuevaPregunta);
        }

        // Guardar las preguntas actualizadas en localStorage
        localStorage.setItem("preguntas", JSON.stringify(preguntasGuardadas));
        handleClose();
    };

    const handleClose = () => {
        document.getElementById(id).close(); // Cerrar el modal
    };

    const handleTipoPreguntaChange = (e) => {
        const nuevoTipo = e.target.value;
        setTipoPregunta(nuevoTipo);
        
        // Solo actualizar opciones si estamos en modo crear
        if (modo === "crear") {
            setOpciones(inicializarOpciones(nuevoTipo));
            setRespuestaCorrecta(initialData.respuestaCorrecta);
        }
    };

    const inicializarOpciones = (tipo) => {
        switch (tipo) {
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

    const photoIcon = "M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10m18 0-4.5-6-3.5 4.5-2.5-3L3 15m18 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m10-6h.01";

    return (
        <>
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
                                <input type="text" value={textoPregunta} onChange={(e) => setTextoPregunta(e.target.value)} className="input w-full" />
                                <button type="button" className="btn btn-square btn-ghost">
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
                                {opciones.map((opcion, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 border p-3 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="radio-1"
                                                className="radio"
                                                checked={respuestaCorrecta === idx}
                                                onChange={() => setRespuestaCorrecta(idx)}
                                            />
                                            <span className="font-semibold">Opción {idx + 1}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder={`Texto opción ${idx + 1}`}
                                                className="input flex-1"
                                                value={opcion}
                                                onChange={(e) => {
                                                    const nuevasOpciones = [...opciones];
                                                    nuevasOpciones[idx] = e.target.value;
                                                    setOpciones(nuevasOpciones);
                                                }}
                                            />
                                            <button type="button" className="btn btn-square btn-ghost">
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
                                                checked={respuestaCorrecta === idx}
                                                onChange={() => setRespuestaCorrecta(idx)}
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
                                        {/* Columna 1 */}
                                        <div className="flex items-center gap-2 w-1/2">
                                            <input
                                                type="text"
                                                placeholder={`Izquierda ${idx + 1}`}
                                                className="input flex-1"
                                                value={item.izquierda}
                                                onChange={(e) => {
                                                    const nuevasOpciones = [...opciones];
                                                    nuevasOpciones[idx].izquierda = e.target.value;
                                                    setOpciones(nuevasOpciones);
                                                }}
                                            />
                                        </div>
                                        {/* Columna 2 */}
                                        <div className="flex items-center gap-2 w-1/2">
                                            <input
                                                type="text"
                                                placeholder={`Derecha ${idx + 1}`}
                                                className="input flex-1"
                                                value={item.derecha}
                                                onChange={(e) => {
                                                    const nuevasOpciones = [...opciones];
                                                    nuevasOpciones[idx].derecha = e.target.value;
                                                    setOpciones(nuevasOpciones);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Botones de guardar o cancelar */}
                        <div className="flex justify-between gap-4">
                            <button type="button" className="btn" onClick={handleClose}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={guardarPregunta}>Guardar</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
});

export default EditarPregunta;