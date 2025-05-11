import { useState, useEffect, useRef } from "react";
import EditarPregunta from "./EditarPregunta";
import { useNavigate } from 'react-router-dom';

export default function EditarGuia() {
  const refEditarPregunta = useRef();
  const navigate = useNavigate();
  const [esMaestro, setEsMaestro] = useState(false);
  const [enviarAcademia, setEnviarAcademia] = useState(false);  
  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const checkIcon = "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125";
  const deleteIcon = "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z";
  
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
    console.log(JSON.stringify(preguntas, null, 2));
}, []);

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
        localStorage.setItem("preguntas", JSON.stringify(preguntasStorage));
      } catch (error) {
        console.error("Error al cargar preguntas:", error);
      }
    }
  
    obtenerPreguntas();
  }, []);
    
  const [guia, setGuia] = useState(() => {
    const guiaGuardada = localStorage.getItem('guia');
    if (guiaGuardada) {
      return JSON.parse(guiaGuardada);
    }
    return {};
  });

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

  const mostrarPopupSiNecesario = () => {
    if (guia.publicada && guia.seguidores > 0 && !popupShown) {
      setShowPopup(true);
    }
  };

  const confirmarNuevaVersion = () => {
    setGuia((prev) => ({
      ...prev,
      version: prev.version + 1,
    publicada: false,
    seguidores: 0
    }));
    setShowPopup(false);
    setPopupShown(true);
    handlePublicarOEnviar();
  };

  const modalRef = useRef();

  const [modalConfig, setModalConfig] = useState({
      modo: "crear",
      id: "modalpregunta",
      title: "Crear pregunta"
  });

const abrirModalCrear = () => {
  setModalConfig({
    id: "modalPregunta",
    modo: "crear",
    title: "Crear pregunta"
  });
};

const abrirModalEditar = (pregunta) => {
  setModalConfig({
    id: pregunta.id,
    modo: "editar",
    title: "Editar pregunta"
  });
};

  useEffect(() => {
    if (modalConfig.modo && refEditarPregunta.current) {
        refEditarPregunta.current.openModal();
    }
  }, [modalConfig]);

  const handleEliminarPregunta = (id) => {
    mostrarPopupSiNecesario();
    const preguntasStorage = JSON.parse(localStorage.getItem("preguntas"));
    const { listado, nuevas, editadas, eliminadas } = preguntasStorage;
  
    // Buscar la pregunta por su id
    const todas = [...listado, ...nuevas, ...editadas];
    const preguntaEliminada = todas.find(p => p.id === id);
    if (!preguntaEliminada) return;
    const esDeNuevas = nuevas.some(p => p.id === id);
    if (!esDeNuevas) {    // Solo agregar a eliminadas si no es de nuevas
      eliminadas.push(preguntaEliminada);
    }
    ["listado", "nuevas", "editadas"].forEach(categoria => {    // Eliminar de su categoría original
      preguntasStorage[categoria] = preguntasStorage[categoria].filter(p => p.id !== id);
    });
    localStorage.setItem("preguntas", JSON.stringify(preguntasStorage));
    setPreguntas([
      ...preguntasStorage.listado,
      ...preguntasStorage.nuevas,
      ...preguntasStorage.editadas
    ]);
  };
  
  const handlePublicarOEnviar = () => {
    console.log("localStorage.guia crudo:", localStorage.getItem('guia'));
  const guia = JSON.parse(localStorage.getItem('guia'));
  const preguntas = JSON.parse(localStorage.getItem('preguntas'));
  console.log("guia: ",guia);
    if (enviarAcademia) {
        console.log("Enviando a la academia...");
        // enviar
    } else {
        console.log("Publicando guía...");
        // publicar
    }

  fetch('http://localhost:4000/guias/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({ guia, preguntas }),
  })
  .then(res => res.json())
  .then(data => {
    console.log('Guía guardada correctamente:', data);
    navigate('/mis-guias');
  })
  .catch(error => {
    console.error('Error al guardar la guía:', error);
  });
  };

useEffect(() => {
  return () => {
    localStorage.removeItem("guia");
    localStorage.removeItem("preguntas");
  };
}, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Editar Guía de Estudio</h1>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md text-center shadow-lg">
            <p className="text-lg font-bold text-black mb-6">
              Esta guía ya está siendo seguida por otros usuarios. Se creará una nueva versión de esta guía. <br /> ¿Desea crear una nueva versión?
            </p>
            <button
              className="btn btn-primary mr-4"
              onClick={confirmarNuevaVersion}
            >
              Confirmar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowPopup(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-15">
        <div className="w-full lg:w-1/2 flex flex-col gap-6 min-h-[500px]">
          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Nombre de la guía</legend>
            <input type="text" className="input text-lg w-full" defaultValue={guia.nombre} />
          </fieldset>

          {guia.tipo === "curricular" &&(<fieldset>
            <legend className="font-semibold mb-2 text-lg">Materia</legend>
            <select className="select w-full" disabled={guia.publicada}>
              <option>{guia.materia}</option>
            </select>
          </fieldset>
          )}
          {guia.tipo === "curricular" &&(<fieldset>
            <legend className="font-semibold mb-2 text-lg">Academia</legend>
            <select className="select w-full" disabled={guia.publicada}>
              <option>{guia.academia}</option>
            </select>
          </fieldset>
          )}
          {guia.tipo === "curricular" &&(<fieldset>
            <legend className="font-semibold mb-2 text-lg">Departamento</legend>
            <select className="select w-full" disabled={guia.publicada}>
              <option>{guia.departamento}</option>
            </select>
          </fieldset>
          )}
          {guia.tipo === "curricular" &&(<fieldset>
            <legend className="font-semibold mb-2 text-lg">Plan de Estudios</legend>
            <select className="select w-full" disabled={guia.publicada}>
              <option>{guia.plan}</option>
            </select>
          </fieldset>
          )}
          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Versión</legend>
            <select className="select w-full" disabled={guia.publicada}>
              <option>{guia.version}</option>
            </select>
          </fieldset>

          {esMaestro && (
            <fieldset>
              <input 
                type="checkbox"
                id="enviarAcademia"
                className="checkbox checkbox-info mr-2"
                checked={enviarAcademia}
                onChange={() => setEnviarAcademia(!enviarAcademia)}
              />
              <label htmlFor="enviarAcademia" className="ml-2">¿Desea enviar esta guía a revisión de academia?</label>
            </fieldset>
          )}

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Descripción</legend>
            <textarea className="textarea text-lg flex-1 min-h-[150px] w-full" placeholder="Escribe una descripción">{guia.descripcion}</textarea>
          </fieldset>

            <div className="flex justify-between gap-4">
              {((!guia.publicada) || (guia.publicada && guia.seguidores > 0 && enviarAcademia)
                ) && (
                  <button 
                    className="btn btn-primary w-1/3 h-14 min-w-[120px]"
                    onClick={() => {
                      if (guia.publicada && guia.seguidores > 0 && !popupShown) {
                        setShowPopup(true);
                          } else {
                        handlePublicarOEnviar();
                      }
                    }}>{enviarAcademia ? "Enviar" : "Publicar"}
                  </button>
              )}
              <button className="btn btn-accent w-1/3 h-14 min-w-[120px]" onClick={handlePublicarOEnviar}>Guardar y Salir</button>
              <button className="btn btn-secondary w-1/3 h-14 min-w-[120px]" onClick={() => navigate(-1)}>Eliminar</button>
            </div>
        </div>

        {/* Lista de Preguntas */}
        <div className="w-full lg:w-1/2">
          <ul className="bg-base-100 rounded-box shadow-md h-[800px] overflow-y-auto">
            <li className="p-4 text-xs opacity-60 tracking-wide font-semibold">Lista de Preguntas</li>

            {preguntas.map((pregunta) => (
              <li key={pregunta.id} className="flex items-center gap-4 px-3 border-b py-2">
                <div className="flex flex-col flex-grow">
                  <div className="font-semibold text-lg">{pregunta.question}</div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => abrirModalEditar(pregunta)}
                    className="btn btn-square btn-ghost">
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                        <path d={checkIcon}></path>
                      </g>
                    </svg>
                  </button>
                  <button 
                    className="btn btn-square btn-ghost"
                    onClick={() => handleEliminarPregunta(pregunta.id)}
                  >
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                        <path d={deleteIcon}></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </li>
            ))}

            {/* Botón para añadir preguntas */}
            <li className="flex justify-center py-4">
            <button className="btn btn-outline btn-primary w-3/4 h-12" onClick={abrirModalCrear}>+ Añadir Pregunta</button>
              <EditarPregunta
                  ref={refEditarPregunta}
                  id={modalConfig.id}
                  title={modalConfig.title}
                  modo={modalConfig.modo}
                  onSave={() => {
                    const preguntasStorage = JSON.parse(localStorage.getItem("preguntas"));
                      setPreguntas([
                        ...preguntasStorage.listado,
                        ...preguntasStorage.nuevas,
                        ...preguntasStorage.editadas
                      ]);
                  }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}