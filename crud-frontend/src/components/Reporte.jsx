import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Reporte() {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [nombreGuia, setNombreGuia] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const guiaSeleccionada = JSON.parse(localStorage.getItem("guiaSeleccionada"));

   useEffect(() => {
    if (guiaSeleccionada?.nombre) {
      setNombreGuia(guiaSeleccionada.nombre);
    }
  }, []);

  const reportReasons = [
    {
      value: "cont_exp",
      title: "Contenido Explícito",
      description: "Material que contiene imágenes, videos o descripciones explícitas no aptas para todo público.",
    },
    {
      value: "disc_odio",
      title: "Contenido ofensivo o discurso de odio",
      description: "Material que promueve la discriminación, violencia o lenguaje ofensivo hacia grupos o individuos.",
    },
    {
      value: "disonancia",
      title: "Disonancia de Contenido",
      description: "La información presentada en la guía no es coherente con el tema o es incorrecta.",
    },
    {
      value: "spam",
      title: "Spam",
      description: "Publicaciones repetitivas, enlaces engañosos, etc.",
    },
  ];

  const handleSubmit = async () => {
  if (!selectedReason) {
    alert("Por favor, selecciona una razón para el reporte.");
    return;
  }

  if (!description.trim()) {
    alert("Por favor, describe el problema en el campo de texto.");
    return;
  }

  const payload = {
    id_usuario: guiaSeleccionada?.id_autor,
    id_gde: guiaSeleccionada?.id,
    categoria: selectedReason,
    descripcion: description,
    id_quienreporto: userData?.id_usuario,
  };

  try {
    const res = await fetch("http://localhost:4000/reportes/registrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();

      if (res.status === 409) {
        alert("Ya has reportado esta guía por esa categoría.");
        return;
      }

      throw new Error(errorData.message || "Error al enviar el reporte");
    }

    alert("Reporte enviado correctamente.");
    navigate(-1); // Regresar a la vista anterior
  } catch (error) {
    console.error("Error al enviar el reporte:", error);
    alert("Ocurrió un error al enviar el reporte. Intente nuevamente.");
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-8 flex-grow max-w-3xl rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center mb-6">Reportar Guía</h1>
        {nombreGuia && (
          <p className="text-center text-gray-300 text-lg mb-6">Nombre: <strong>{nombreGuia}</strong></p>
        )}
        <p className="text-lg text-gray-300 text-center mb-6">
          ¿Considera que la guía contiene alguna de las siguientes opciones?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-md">
          {reportReasons.map((reason) => (
            <label
              key={reason.value}
              className="flex items-start space-x-3 cursor-pointer p-3 hover:bg-gray-700 rounded-lg transition"
            >
              <input
                type="radio"
                name="reportReason"
                value={reason.value}
                checked={selectedReason === reason.value}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="radio radio-primary mt-1"
              />
              <div>
                <h3 className="text-white font-semibold">{reason.title}</h3>
                <p className="text-gray-400 text-sm">{reason.description}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-white font-medium mb-3">
            Describa el problema de manera general:
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-36 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Explique brevemente el motivo del reporte..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={handleSubmit}
            className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Enviar Reporte
          </button>
          <button
            onClick={() => navigate(-1)}
            className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
