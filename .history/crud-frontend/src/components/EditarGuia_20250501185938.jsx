import { useState, useRef } from "react";
import EditarPregunta from "./EditarPregunta";
import { useNavigate } from 'react-router-dom';

export default function EditarGuia() {
  const navigate = useNavigate();

  const [guiaCompleta, setGuiaCompleta] = useState({
    nombre: "Guía de Álgebra",
    materia: "Matemáticas",
    academia: "Ciencias Exactas",
    departamento: "Ingeniería",
    planEstudios: "2020",
    version: 1,
    publicada: true,
    seguidores: 15,
    descripcion: "",
    preguntas: [
      {
        texto: "Pregunta 1",
        descripcion: "Esta es una descripción de Pregunta 1"
      },
      {
        texto: "Pregunta 2",
        descripcion: "Esta es una descripción de Pregunta 2"
      }
    ]
  });

  const [esMaestro, setEsMaestro] = useState(false);
  const [enviarAcademia, setEnviarAcademia] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

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
  };

  const abrirModalEditar = (pregunta, index) => {
    setModalConfig({
      modo: "editar",
      preguntaData: { ...pregunta, index }
    });
    setTimeout(() => modalRef.current?.openModal(), 0);
  };

  const agregarPregunta = (nuevaPregunta) => {
    setGuiaCompleta((prev) => ({
      ...prev,
      preguntas: [...prev.preguntas, nuevaPregunta]
    }));
  };

  const editarPregunta = (preguntaEditada, index) => {
    const nuevas = [...guiaCompleta.preguntas];
    nuevas[index] = preguntaEditada;
    setGuiaCompleta((prev) => ({
      ...prev,
      preguntas: nuevas
    }));
  };

  const eliminarPregunta = (index) => {
    mostrarPopupSiNecesario();
    setGuiaCompleta((prev) => ({
      ...prev,
      preguntas: prev.preguntas.filter((_, i) => i !== index)
    }));
  };

  const mostrarPopupSiNecesario = () => {
    if (guiaCompleta.publicada && guiaCompleta.seguidores > 0 && !popupShown) {
      setShowPopup(true);
    }
  };

  const confirmarNuevaVersion = () => {
    setGuiaCompleta((prev) => ({
      ...prev,
      version: prev.version + 1,
      publicada: false,
      seguidores: 0
    }));
    setShowPopup(false);
    setPopupShown(true);
    handlePublicarOEnviar();
  };

  const handlePublicarOEnviar = () => {
    const datosAEnviar = {
      ...guiaCompleta,
      enviarAcademia
    };
    console.log("Enviando JSON al backend:", JSON.stringify(datosAEnviar, null, 2));
    // Aquí usarías fetch o axios para enviar `datosAEnviar` al backend
  };

  const handleChangeCampo = (campo, valor) => {
    setGuiaCompleta((prev) => ({
      ...prev,
      [campo]: valor
    }));
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
            <button className="btn btn-primary mr-4" onClick={confirmarNuevaVersion}>Confirmar</button>
            <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Nombre de la guía</legend>
            <input
              type="text"
              className="input text-lg w-full"
              value={guiaCompleta.nombre}
              onChange={(e) => handleChangeCampo("nombre", e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Versión</legend>
            <input className="input w-full" value={guiaCompleta.version} disabled />
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
            <textarea
              className="textarea text-lg w-full min-h-[150px]"
              placeholder="Escribe una descripción"
              value={guiaCompleta.descripcion}
              onChange={(e) => handleChangeCampo("descripcion", e.target.value)}
            />
          </fieldset>

          <div className="flex justify-between gap-4">
            <button
              className="btn btn-primary w-1/3"
              onClick={() => {
                if (guiaCompleta.publicada && guiaCompleta.seguidores > 0 && !popupShown) {
                  setShowPopup(true);
                } else {
                  handlePublicarOEnviar();
                }
              }}
            >
              {enviarAcademia ? "Enviar" : "Publicar"}
            </button>
            <button className="btn btn-accent w-1/3" onClick={() => navigate(-1)}>Guardar y Salir</button>
            <button className="btn btn-secondary w-1/3" onClick={() => navigate(-1)}>Eliminar</button>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <ul className="bg-base-100 rounded-box shadow-md h-[800px] overflow-y-auto">
            <li className="p-4 text-xs opacity-60 tracking-wide font-semibold">Lista de Preguntas</li>

            {guiaCompleta.preguntas.map((pregunta, index) => (
              <li key={index} className="flex items-center gap-4 px-3 border-b py-2">
                <div className="flex flex-col flex-grow">
                  <div className="font-semibold text-lg">{pregunta.texto}</div>
                  <p className="text-sm text-gray-600">{pregunta.descripcion}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => abrirModalEditar(pregunta, index)}
                    className="btn btn-square btn-ghost"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => eliminarPregunta(index)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}

            <li className="flex justify-center py-4">
              <button className="btn btn-outline btn-primary w-3/4" onClick={abrirModalCrear}>+ Añadir Pregunta</button>
              <EditarPregunta
                ref={modalRef}
                id="Modal"
                title={modalConfig.modo === "crear" ? "Agregar Pregunta" : "Editar Pregunta"}
                modo={modalConfig.modo}
                preguntaData={modalConfig.preguntaData}
                onGuardar={(data) => {
                  if (modalConfig.modo === "crear") agregarPregunta(data);
                  else editarPregunta(data, modalConfig.preguntaData.index);
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}