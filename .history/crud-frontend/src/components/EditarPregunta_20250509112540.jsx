import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';

const EditarPregunta = forwardRef(({ id, title, modo }, ref) => {    
    
    const initialData = {
        id: `${Date.now()}`,
        type: "multipleChoice",
        question: "",
        options: [],
        answer: ""
    };

    const idFinal = modo === "editar" ? id : `temp-${Date.now()}`;

    const guardarPreguntaEditada = () => {
        const idFinal = id;
        const preguntaEditada = {
            id: idFinal,
            type: tipoPregunta,
            question: textoPregunta,
            options: opciones,
            answer: respuestaCorrecta
        };
    
        const data = localStorage.getItem("preguntas");
        const preguntas = data
            ? JSON.parse(data)
            : { nuevas: [], editadas: [], eliminadas: [], listado: [] };
    
        // Reemplazar en listado si existe
        preguntas.listado[idFinal] = preguntaEditada;
    
        // Agregar o reemplazar en editadas
        const index = preguntas.editadas.findIndex(p => p.id === idFinal);
        if (index !== -1) {
            preguntas.editadas[index] = preguntaEditada;
        } else {
            preguntas.editadas.push(preguntaEditada);
        }
    
        localStorage.setItem("preguntas", JSON.stringify(preguntas));
        handleClose();
    };
    
    

    const guardarNuevaPregunta = () => {
        const nuevaPregunta = {
            id: initialData.id,
            type: tipoPregunta,
            question: textoPregunta,
            options: opciones,
            answer: respuestaCorrecta
        };
    
        const data = localStorage.getItem("preguntas");
        const preguntas = data ? JSON.parse(data) : { nuevas: [], editadas: [], eliminadas: [] };
    
        // Asegurarse de que "nuevas" es un arreglo antes de hacer el push
        if (!Array.isArray(preguntas.nuevas)) {
            preguntas.nuevas = [];
        }
    
        preguntas.nuevas.push(nuevaPregunta);
    
        localStorage.setItem("preguntas", JSON.stringify(preguntas));
        const dat = localStorage.getItem("preguntas");
        const pre = data ? JSON.parse(dat) : { nuevas: [], editadas: [], eliminadas: [] };
        console.log(pre)
        handleClose();
    };
    
    
    

    const [tipoPregunta, setTipoPregunta] = useState(initialData.type);
    const [textoPregunta, setTextoPregunta] = useState(initialData.question);
    const [opciones, setOpciones] = useState(initialData.options);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(initialData.answer);

    const inicializarOpciones = (type) => {
        switch (type) {
            case "multipleChoice":
                return ["", "", "", ""];
            case "trueFalse":
                return ["Verdadero", "Falso"];
            case "matching":
                return Array(5).fill().map(() => ({ izquierda: "", derecha: "" }));
            default:
                return [];
        }
    };

    useEffect(() => {
        console.log("ID recibido en el modal:", id);
        if (modo === "editar" && id) {
            
            const data = localStorage.getItem("preguntas");
            const preguntas = data ? JSON.parse(data) : { nuevas: [], editadas: [], eliminadas: [], listado: {} };
    
            // Primero busca en listado
            let pregunta = preguntas.listado?.[stringId];
            if (pregunta) {
                console.log("Encontrada en listado:", stringId, pregunta);
            }
    
            // Si no está en listado, busca en editadas
            if (!pregunta) {
                const encontradaEditada = preguntas.editadas.find(p => String(p.id) === stringId);
                if (encontradaEditada) {
                    console.log("Encontrada en editadas:", stringId, encontradaEditada);
                    pregunta = encontradaEditada;
                }
            }
    
            // Si no está en editadas, busca en nuevas
            if (!pregunta) {
                const encontradaNueva = preguntas.nuevas.find(p => String(p.id) === stringId);
                if (encontradaNueva) {
                    console.log("Encontrada en nuevas:", stringId, encontradaNueva);
                    pregunta = encontradaNueva;
                }
            }
    
            if (pregunta) {
                setTipoPregunta(pregunta.type || initialData.type);
                setTextoPregunta(pregunta.question || initialData.question);
                setOpciones(pregunta.options || inicializarOpciones(pregunta.type));
                setRespuestaCorrecta(pregunta.answer ?? initialData.answer);
            }
        } else {
            setTipoPregunta(initialData.type);
            setTextoPregunta(initialData.question);
            setOpciones(inicializarOpciones(initialData.type));
            setRespuestaCorrecta(initialData.answer);
        }
    }, [modo, id]);
    

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
            setRespuestaCorrecta(initialData.respuestaCorrecta);
        }
    };

    const handleImageClick = (option) => (e) => {
        e.stopPropagation();
        console.log(`Añadir imagen a: ${option}`);
    };

    const photoIcon = "M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10m18 0-4.5-6-3.5 4.5-2.5-3L3 15m18 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m10-6h.01";

    return (
        <dialog id={id} className="modal">
            <div className="modal-box w-full max-w-3xl p-6">
                <h3 className="font-bold text-lg text-center mb-4">{title}</h3>

                <form className="flex flex-col gap-6">
                    <div className="flex gap-4">
                    <select value={tipoPregunta} onChange={handleTipoPreguntaChange} className="select flex-1">
                        <option value="multipleChoice">Opción múltiple</option>
                        <option value="trueFalse">Verdadero o Falso</option>
                        <option value="matching">Relación de columnas</option>
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

                    {/* Opción múltiple */}
                    {tipoPregunta === "multipleChoice" && (
                        <div className="grid grid-cols-2 gap-4">
                        {opciones.map((opcion, idx) => (
                            <div key={idx} className="flex flex-col gap-2 border p-3 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="radio-1"
                                        className="radio"
                                        checked={respuestaCorrecta === opcion} // Compara con el valor de la opción
                                        onChange={() => setRespuestaCorrecta(opcion)} // Establece la respuesta correcta como el valor de la opción
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

                    {/* Verdadero o Falso */}
                    {tipoPregunta === "trueFalse" && (
                        <div className="flex gap-4">
                        {opciones.map((opcion, idx) => (
                            <div key={idx} className="flex flex-col gap-2 border p-3 rounded-lg shadow-sm flex-1">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="radio-1"
                                        className="radio"
                                        checked={respuestaCorrecta === opcion} // Compara con el texto de la opción
                                        onChange={() => setRespuestaCorrecta(opcion)} // Establece la respuesta correcta como el texto de la opción
                                    />
                                    <span className="font-semibold">{opcion}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    )}

                    {/* Relación de columnas */}
                    {tipoPregunta === "matching" && (
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
                        <button className="btn btn-primary" type="button" 
                            onClick={modo === "editar" ? guardarPreguntaEditada : guardarNuevaPregunta}
                        >
                            {modo === "editar" ? "Guardar Cambios" : "Agregar Pregunta"}
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