import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function AceptarGuiaAcademia() {
    const navigate = useNavigate();

    const [motivo, setMotivo] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Información de la guía
    useEffect(() => {
        let preguntas = localStorage.getItem("preguntas");
        if (!preguntas) {
            const initialData = {
                listado: [],
                nuevas: [],
                editadas: [],
                eliminadas: []
            };
            localStorage.setItem("preguntas", JSON.stringify(initialData));
            preguntas = initialData;
        } else {
            preguntas = JSON.parse(preguntas);
        }
      }, []);
    
      const [guia, setGuia] = useState(() => {
        const guiaGuardada = localStorage.getItem('guia');
        if (guiaGuardada) {
          return JSON.parse(guiaGuardada);
        }
        return {};
      });

    // Estado de las preguntas de la guía
    const [preguntas, setPreguntas] = useState(() => {
    const guardadas = localStorage.getItem("preguntas");
    if (!guardadas) return [];
    try {
      const datos = JSON.parse(guardadas);
      const listado = Array.isArray(datos.listado) ? datos.listado : [];
      const nuevas = Array.isArray(datos.nuevas) ? datos.nuevas : [];
      const editadas = Array.isArray(datos.editadas) ? datos.editadas : [];
      return [...listado, ...nuevas, ...editadas];
    } catch (error) {
      console.error("Error al parsear preguntas de localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    async function obtenerPreguntas() {
      try {
        const response = await fetch(`http://localhost:4000/guias/preguntas?id_guia=${guia.id}`); 
        if (!response.ok) throw new Error("Error al obtener las preguntas");
  
        const data = await response.json();
  
        // Guardamos en estado
        setPreguntas(data);
  
        // Guardamos en localStorage.preguntas.listado
        const preguntasStorage = JSON.parse(localStorage.getItem("preguntas"));
  
        preguntasStorage.listado = data;
        console.table(preguntasStorage);
        localStorage.setItem("preguntas", JSON.stringify(preguntasStorage));
      } catch (error) {
        console.error("Error al cargar preguntas:", error);
      }
    }
  
    obtenerPreguntas();
  }, []);

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

const handleRechazar = async () => {
  if (!motivo.trim()) {
    setError("Debe especificar un motivo de rechazo");
    return;
  }

  setIsSubmitting(true);
  setError(null);

  try {
    const token = localStorage.getItem('token');
    console.table(guia);

    const response = await fetch('http://localhost:4000/guias/solicitudes/rechazar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        id_solicitud: guia.id_solicitud, 
        motivo 
      })
    });

    const textResponse = await response.text(); // Primero obtener como texto
    
    try {
      const data = textResponse ? JSON.parse(textResponse) : {};
      
      if (!response.ok) {
        throw new Error(data.message || "Error al rechazar la guía");
      }

      // Cerrar el modal y navegar
      document.getElementById('rechazarGuia').close();
      navigate("/mis-guias-academia", {
        state: { message: "Guía rechazada exitosamente" }
      });
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      throw new Error("Respuesta del servidor no es JSON válido");
    }
  } catch (err) {
    console.error("Error al rechazar guía:", err);
    setError(err.message || "Error al procesar la respuesta del servidor");
  } finally {
    setIsSubmitting(false);
  }
};

const aceptarValidacion = async (id_gde, id_solicitud) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/guias/solicitudes/aceptar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_gde: id_gde,
                id_solicitud: id_solicitud
            })
        });

        const data = await response.json();

        if(!response.ok || !data.success) {
            throw new Error(data.error || 'Error al procesar la solicitud');
        }

        console.log('Guia aceptada y solicitud eliminada', data);
        return {
            guia: data.guia,
            solicitud: data.solicitud
        }
    } catch (ina) {
        console.error("Error al aceptar la validación de la guía de estudio", ina.message);
        throw ina;
    }
};

const handleAceptar = async () => {
    setLoading(true);

    try {
        const result = await aceptarValidacion(guia.id, guia.id_solicitud);
        console.log("Resultado: ", result);
        navigate('/mis-guias-academia');
    } catch (ina) {
        setError(ina.message);
    } finally {
        setLoading(false);
    }
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
                            <li><strong>Nombre: </strong>{guia.nombre}</li>
                            <li><strong>Autor: </strong>{guia.nombre_usuario + " " + guia.apellidos}</li>
                            {guia.tipo === "C" && (
                                <>
                                    <li><strong>Materia: </strong>{guia.materia}</li>
                                    <li><strong>Academia: </strong>{guia.academia}</li>
                                    <li><strong>Plan de Estudio: </strong>{guia.plan}</li>
                                    <li><strong>Versión de la guía: </strong>{guia.version}</li>
                                </>
                            )}
                            <li>
                                <strong>Descripción: </strong>
                                <p className="text-gray-300 max-h-40 overflow-y-auto">{guia.descripcion}</p>
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
                                    <div className="font-semibold text-lg">{pregunta.question}</div>
                                    <p className="text-sm text-gray-600">{pregunta.type}</p>
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
                    onClick={handleAceptar}
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
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        required
                    ></textarea>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className="flex justify-center gap-4">
                        <button 
                            className={`btn btn-error px-6 ${isSubmitting ? 'cargando' : ''}`}
                            onClick={handleRechazar}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "" : "Rechazar"}
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
                        <h2 className="text-xl font-bold mb-4">Pregunta: {selectedQuestion.question}</h2>

                        <div className="mb-4">
                            {selectedQuestion.type === "trueFalse" ? (
                                <div>
                                    <div className="font-semibold">Respuesta correcta:</div>
                                    <div>{selectedQuestion.answer}</div>
                                </div>
                            ) : selectedQuestion.type === "multipleChoice" ? (
                                <div>
                                    <div className="font-semibold">Respuestas:</div>
                                    <ul className="list-disc pl-5">
                                        {selectedQuestion.options.map((respuesta, idx) => (
                                            <li key={idx} className="text-sm text-white">
                                                {selectedQuestion.answer.includes(respuesta) ? (
                                                    <span className="text-green-500">{respuesta}</span>
                                                ) : (
                                                    respuesta
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : selectedQuestion.type === "matching" && (
                                <div>
                                    <div className="font-semibold">Relaciona las siguientes:</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedQuestion.options.map((item, idx) => (
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