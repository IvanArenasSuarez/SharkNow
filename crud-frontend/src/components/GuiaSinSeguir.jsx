import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function GuiaSinSeguir() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const guiaSeleccionada = JSON.parse(localStorage.getItem("guiaSeleccionada"));

  const [datosGuia, setDatosGuia] = useState(null);
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchDetallesGuia = async () => {
      if (guiaSeleccionada?.id) {
        try {
          const res = await fetch(`http://localhost:4000/guias/detalles?id_gde=${guiaSeleccionada.id}`);
          const data = await res.json();
          setDatosGuia(data);
        } catch (error) {
          console.error("Error al cargar detalles de la guía:", error);
        }
      }
    };

    fetchDetallesGuia();
  }, []);

  useEffect(() => {
    async function obtenerPreguntas() {
      if (!guiaSeleccionada?.id) return;
      try {
        const response = await fetch(`http://localhost:4000/guias/preguntas?id_guia=${guiaSeleccionada.id}`); 
        if (!response.ok) throw new Error("Error al obtener las preguntas");

        const data = await response.json();
        setPreguntas(data);

        // Guardar también en localStorage
        localStorage.setItem("preguntas", JSON.stringify({ listado: data }));
      } catch (error) {
        console.error("Error al cargar preguntas:", error);
      }
    }

    obtenerPreguntas();
  }, []);

  if (!datosGuia) return <p className="text-center mt-10">Cargando detalles de la guía...</p>;

  const esCurricular = datosGuia.tipo === "C";

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-8 mb-6">Vista de Guía
        {guiaSeleccionada.tipo_autor === 2 && guiaSeleccionada.estado === 'P' &&(
          <img
            src="/src/assets/SharkCheck.png"
            alt="SharkCheck"
            className="inline w-25 h-15 rounded-full"
          />
        )}
        {guiaSeleccionada.estado === 'V' && (
          <img
            src="/src/assets/SharkVerify.png"
            alt="SharkVerify"
            className="inline w-25 h-15 rounded-full"
          />
        )}
      </h1>

      <div className="p-4 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Columna Izquierda - Información de la Guía */}
          <div className="w-full lg:w-1/2 border border-gray-500 p-4 rounded-lg shadow-xl text-white">
            <h2 className="text-3xl text-center font-bold mb-4">Información de la Guía</h2>
            <div className="w-45 h-45 rounded-full overflow-hidden shadow-lg mx-auto mb-4">
              <img
                src={`http://localhost:4000/avatar/imagen?id_usuario=${guiaSeleccionada?.id_autor}`}
                alt="Avatar del usuario"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="space-y-2">
              <li><strong>Nombre:</strong> {datosGuia.nombre}</li>
              <li><strong>Autor:</strong> {datosGuia.nombre_autor} {datosGuia.apellidos_autor}</li>
              <li><strong>Materia:</strong> {esCurricular ? datosGuia.nombre_materia : "Extracurricular"}</li>
              {esCurricular && datosGuia.nombre_academia && (
                <li><strong>Academia:</strong> {datosGuia.nombre_academia}</li>
              )}
              {esCurricular && datosGuia.nombre_programa && (
                <li><strong>Programa Académico:</strong> {datosGuia.nombre_programa}</li>
              )}
              {esCurricular && datosGuia.anio_plan && (
                <li><strong>Plan de Estudio:</strong> {datosGuia.nombre_programa} ({datosGuia.anio_plan})</li>
              )}
              <li><strong>Versión de la guía:</strong> {datosGuia.version}</li>
              <li>
                <strong>Descripción:</strong>
                <p className="text-gray-300 max-h-40 overflow-y-auto text-justify">{datosGuia.descripcion}</p>
              </li>
            </ul>
          </div>

          {/* Columna Derecha - Lista de Preguntas */}
          <div className="w-full lg:w-1/2 text-white">
            <div className="flex justify-end mb-2">
              <button
              className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => {
                // Guardamos los datos necesarios para el reporte
                localStorage.setItem("reporteData", JSON.stringify({
                  id_usuario: userData.id_usuario,
                  id_gde: guiaSeleccionada.id
                }));

                // Redirigimos a la página de reporte
                navigate('/reporte');
              }}
            >
              Reportar
            </button>

            </div>
            <ul className="bg-base-100 rounded-box shadow-md h-[400px] overflow-y-auto">
              <li className="p-4 text-xs opacity-60 tracking-wide font-semibold">Lista de Preguntas</li>
              {preguntas.length > 0 ? (
                preguntas.map((pregunta, index) => (
                  <li key={index} className="flex items-center gap-4 px-3 border-b py-2">
                    <div className="flex flex-col flex-grow">
                      <div className="font-semibold text-lg">{pregunta.question}</div>
                      <p className="text-sm text-gray-500">Tipo: {pregunta.type}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center py-4 text-gray-400">No hay preguntas registradas.</li>
              )}
            </ul>

            {/* Botones Finales */}
            <div className="flex justify-center gap-4 mt-6">
              <button className="btn btn-primary btn-lg text-lg" onClick={() => navigate(`/quiz-guia/${guiaSeleccionada.id}`)}>Iniciar Sesión de Estudio</button>
              <button
                className="btn btn-secondary btn-lg text-lg"
                onClick={async () => {
                  try {
                    const response = await fetch("http://localhost:4000/guias/seguir", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        id_usuario: userData.id_usuario,
                        id_gde: guiaSeleccionada.id
                      })
                    });

                    if (!response.ok) throw new Error("Error al seguir la guía");

                    // Redirige si todo fue exitoso
                    navigate('/guia-seguida');
                  } catch (error) {
                    console.error("Error al seguir la guía:", error);
                  }
                }}
              >
                Seguir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
