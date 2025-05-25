import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerReporte() {
  const navigate = useNavigate();

  const [detalleGuia, setDetalleGuia] = useState(null);
  const reporte = JSON.parse(localStorage.getItem("reporteSeleccionado"));
  const [preguntas, setPreguntas] = useState([]);
  const [todasVistas, setTodasVistas] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    if (reporte?.id_gde) {
      // Obtener detalles de la guía
      fetch(`http://localhost:4000/guias/detalles?id_gde=${reporte.id_gde}`)
        .then(res => res.json())
        .then(data => setDetalleGuia(data))
        .catch(err => console.error("Error al obtener detalles de la guía:", err));

      // Obtener preguntas reales
      fetch(`http://localhost:4000/guias/preguntas?id_guia=${reporte.id_gde}`)
        .then(res => res.json())
        .then(data => {
          const formateadas = data.map(p => ({
            ...p,
            visualizada: false
          }));
          setPreguntas(formateadas);
        })
        .catch(err => console.error("Error al obtener preguntas:", err));
    }
  }, []);

  const handleEyeClick = (index) => {
    const nuevas = [...preguntas];
    nuevas[index].visualizada = true;
    setPreguntas(nuevas);
    setSelectedQuestion(nuevas[index]);
    setPopupVisible(true);

    if (nuevas.every(p => p.visualizada)) {
      setTodasVistas(true);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedQuestion(null);
  };

  const eyeIcon = "M12 4.5C9.61 4.5 7.47 5.46 6 7c-1.47-1.54-3.61-2.5-6-2.5 2.39 0 4.73 1.46 6 3 1.47-1.54 3.61-3 6-3 2.39 0 4.73 1.46 6 3-1.47-1.54-3.61-2.5-6-2.5zm0 12c-2.39 0-4.73-1.46-6-3-1.47 1.54-3.61 3-6 3 2.39 0 4.73-1.46 6-3 1.47 1.54 3.61 3 6 3zm0-4c-2.39 0-4.73-1.46-6-3-1.47 1.54-3.61 3-6 3 2.39 0 4.73-1.46 6-3 1.47 1.54 3.61 3 6 3z";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Detalles del Reporte</h1>

      {/* Perfil del autor */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={`http://localhost:4000/avatar/imagen?id_usuario=${reporte.id_usuario}`}
          alt="Perfil del usuario"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-lg">
            Autor: {detalleGuia?.nombre_autor || "Autor desconocido"} {detalleGuia?.apellidos_autor || ""}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Información de la guía */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 min-h-[500px]">
          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Nombre de la guía</legend>
            <div className="text-lg">{detalleGuia?.nombre || "Nombre no disponible"}</div>
          </fieldset>

          {detalleGuia?.nombre_materia && (
            <fieldset>
              <legend className="font-semibold mb-2 text-lg">Materia</legend>
              <div className="text-lg">{detalleGuia.nombre_materia}</div>
            </fieldset>
          )}

          {detalleGuia?.nombre_academia && (
            <fieldset>
              <legend className="font-semibold mb-2 text-lg">Academia</legend>
              <div className="text-lg">{detalleGuia.nombre_academia}</div>
            </fieldset>
          )}

          {detalleGuia?.nombre_programa && detalleGuia?.anio_plan && (
            <fieldset>
              <legend className="font-semibold mb-2 text-lg">Plan de Estudios</legend>
              <div className="text-lg">{detalleGuia.nombre_programa} ({detalleGuia.anio_plan})</div>
            </fieldset>
          )}

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Versión de la guía</legend>
            <div className="text-lg">{detalleGuia?.version}</div>
          </fieldset>

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Descripción</legend>
            <div className="text-lg">{detalleGuia?.descripcion}</div>
          </fieldset>
        </div>

        {/* Preguntas */}
        <div className="w-full lg:w-1/2 h-[500px] overflow-y-auto">
          <ul className="bg-base-100 rounded-box shadow-md h-full overflow-y-auto">
            <li className="p-4 text-xs opacity-60 tracking-wide font-semibold">Lista de Preguntas</li>
            {preguntas.map((pregunta, i) => (
              <li
                key={i}
                className={`flex items-center gap-4 px-3 border-b py-2 ${pregunta.visualizada ? "bg-green-700" : ""}`}
              >
                <div className="flex flex-col flex-grow">
                  <div className="font-semibold text-lg">{pregunta.question}</div>
                  <p className="text-sm text-gray-300">{pregunta.type}</p>
                </div>
                <button onClick={() => handleEyeClick(i)} className="btn btn-square btn-ghost">
                  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeWidth="2" d={eyeIcon} />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex justify-between gap-4 mt-6">
        <button className="btn btn-primary w-1/3 h-14" disabled={!todasVistas} onClick={() => navigate("/reportes")}>
          Notificar por cambios técnicos
        </button>
        <button className="btn btn-accent w-1/3 h-14" disabled={!todasVistas} onClick={() => navigate("/reportes")}>
          Mandar a lista negra
        </button>
      </div>

      <div className="mt-4">
        <button className="btn btn-error w-full h-14" disabled={!todasVistas} onClick={() => navigate("/reportes")}>
          Rechazar reporte
        </button>
      </div>

      {/* Popup para detalle de pregunta */}
      {popupVisible && selectedQuestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Pregunta: {selectedQuestion.question}</h2>
            <div className="mb-4">
              {selectedQuestion.type === "trueFalse" && (
                <p className="font-semibold">Respuesta correcta: {selectedQuestion.answer}</p>
              )}
              {selectedQuestion.type === "multipleChoice" && (
                <ul className="list-disc pl-5">
                  {selectedQuestion.options.map((r, i) => (
                    <li key={i} className="text-sm text-white">
                      {selectedQuestion.answer.includes(r) ? (
                        <span className="font-bold text-green-400">{r}</span>
                      ) : (
                        r
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {selectedQuestion.type === "matching" && (
                <>
                  <p className="font-semibold mb-2">Relaciona las siguientes columnas:</p>
                  <ul className="list-disc pl-5">
                    {selectedQuestion.options.map((r, i) => {
                      const esCorrecta = selectedQuestion.answer.some(
                        (c) => c.izquierda === r.izquierda && c.derecha === r.derecha
                      );
                      return (
                        <li
                          key={i}
                          className={`text-sm ${esCorrecta ? "font-bold text-green-400" : "text-white"}`}
                        >
                          {r.izquierda} - {r.derecha}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
            <button className="btn btn-secondary w-full mt-4" onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
