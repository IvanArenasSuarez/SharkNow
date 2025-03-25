import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Reporte() {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");

  const reportReasons = [
    {
      value: "contenido_exp",
      title: "Contenido Explícito",
      description: "Material que contiene imágenes, videos o descripciones explícitas no aptas para todo público.",
    },
    {
      value: "discurso_odio",
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

  const handleSubmit = () => {
    if (!selectedReason) {
      alert("Por favor, selecciona una razón para el reporte.");
      return;
    }

    if (!description.trim()) {
      alert("Por favor, describe el problema en el campo de texto.");
      return;
    }

    console.log("Reporte enviado:", { selectedReason, description });
    alert("Reporte enviado correctamente.");
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-8 flex-grow max-w-3xl rounded-lg shadow-lg">
        
        {/* Título */}
        <h1 className="text-4xl font-bold text-white text-center mb-6">Reportar Guía</h1>

        {/* Pregunta principal */}
        <p className="text-lg text-gray-300 text-center mb-6">
          ¿Considera que la guía contiene alguna de las siguientes opciones?
        </p>

        {/* Opciones de reporte en 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-md">
          {reportReasons.map((reason) => (
            <label key={reason.value} className="flex items-start space-x-3 cursor-pointer p-3 hover:bg-gray-700 rounded-lg transition">
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

        {/* Campo de texto para descripción adicional */}
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

        {/* Botones de acción */}
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