import { useState, useRef } from "react";
import EditarPregunta from "./EditarPregunta";
import { useNavigate } from 'react-router-dom';

export default function EditarGuia() {

  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);
  const [esMaestro, setEsMaestro] = useState(false);
  const [enviarAcademia, setEnviarAcademia] = useState(false);

  const [guia, setGuia] = useState(() => {
    const guiaGuardada = localStorage.getItem('guia');
    if (guiaGuardada) {
      return JSON.parse(guiaGuardada); // Si existe, la convertimos a objeto
    }
    return {}; // Si no hay datos, devolvemos un objeto vacío
  });

  const respuestaPrueba = {
    tipo: "Opción múltiple",
    texto: "¿De qué color son mis calzones?",
    opciones: ["Rojo", "Verde", "Azul", "Negro"],
    respuestaCorrecta: 3
  };

  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  const checkIcon = "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125";
  const deleteIcon = "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z";

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
      preguntaData: null
  });

  const abrirModalCrear = () => {
      setModalConfig({
        modo: "crear",
        preguntaData: null
      });
      setTimeout(() => modalRef.current?.openModal(), 0);
  }

    const abrirModalEditar = (pregunta) => {
        setModalConfig({
            modo: "editar",
            preguntaData: pregunta
         });
          setTimeout(() => modalRef.current?.openModal(), 0);
    }

  const handleEliminarPregunta = (index) => {
    mostrarPopupSiNecesario();
    setPreguntas((prev) => prev.filter((_, i) => i !== index));
  };

const handlePublicarOEnviar = () => {
    if (enviarAcademia) {
        console.log("Enviando a la academia...");
        // enviar
    } else {
        console.log("Publicando guía...");
        // publicar
    }
};


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

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Materia</legend>
            <select className="select w-full" disabled>
              <option>{guia.materia}</option>
            </select>
          </fieldset>

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Academia</legend>
            <select className="select w-full" disabled>
              <option>{guia.academia}</option>
            </select>
          </fieldset>

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Departamento</legend>
            <select className="select w-full" disabled>
              <option>{guia.departamento}</option>
            </select>
          </fieldset>

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Plan de Estudios</legend>
            <select className="select w-full" disabled>
              <option>{guia.planEstudios}</option>
            </select>
          </fieldset>

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Versión</legend>
            <select className="select w-full" disabled>
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
            <textarea className="textarea text-lg flex-1 min-h-[150px] w-full" placeholder="Escribe una descripción"></textarea>
          </fieldset>

            <div className="flex justify-between gap-4">
              {((!guia.publicada) || (guia.publicada && guia.seguidores > 0 && enviarAcademia)
                ) && (
                  <button 
                    className="btn btn-primary w-1/3 h-14 min-w-[120px]"
                    onClick={() => {
                      if (guia.publicada && guia.seguidores > 0 && !popupShown) {
                        setShowPopup(true); // mostrar popup primero
                          } else {
                        handlePublicarOEnviar(); // permitir acción directamente
                      }
                    }}>{enviarAcademia ? "Enviar" : "Publicar"}
                  </button>
              )}
              <button className="btn btn-accent w-1/3 h-14 min-w-[120px]" onClick={() => navigate(-1)}>Guardar y Salir</button>
              <button className="btn btn-secondary w-1/3 h-14 min-w-[120px]" onClick={() => navigate(-1)}>Eliminar</button>
            </div>
        </div>

        {/* Lista de Preguntas */}
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
                    onClick={() => abrirModalEditar(respuestaPrueba)}
                    className="btn btn-square btn-ghost">
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                        <path d={checkIcon}></path>
                      </g>
                    </svg>
                  </button>
                  <button 
                    className="btn btn-square btn-ghost"
                    onClick={() => handleEliminarPregunta(index)}
                  >
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
            <button className="btn btn-outline btn-primary w-3/4 h-12" onClick={abrirModalCrear}>+ Añadir Pregunta</button>
              <EditarPregunta 
                ref={modalRef}
                id="Modal"
                title={modalConfig.modo === "crear" ? "Agregar Pregunta" : "Editar Pregunta"}
                modo = {modalConfig.modo}
                preguntaData = {modalConfig.preguntaData}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}