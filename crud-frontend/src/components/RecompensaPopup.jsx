import React, { useState, useEffect } from 'react';

function RecompensaPopup({ recompensas, onCerrar }) {
  const [recompensaIndex, setRecompensaIndex] = useState(0);

  useEffect(() => {
    // Eliminar la recompensa actual del localStorage al mostrarla
    const recompensaActual = recompensas[recompensaIndex];
    const almacenadas = JSON.parse(localStorage.getItem('recompensas_pendientes') || '[]');
    const filtradas = almacenadas.filter(r => r.id !== recompensaActual.id);
    localStorage.setItem('recompensas_pendientes', JSON.stringify(filtradas));
  }, [recompensaIndex]);

  const manejarSiguiente = () => {
    if (recompensaIndex < recompensas.length - 1) {
      setRecompensaIndex(recompensaIndex + 1);
    } else {
      onCerrar();
    }
  };

  const recompensaActual = recompensas[recompensaIndex];

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">¡Recompensa Desbloqueada!</h2>
        <div className="flex flex-col items-center">
          <img
            src={`/src/assets/${recompensaActual.tipo}/${recompensaActual.id}.png`}
            alt={recompensaActual.nombre}
            className="w-32 h-32 mb-4 rounded-lg"
          />
          <h3 className="text-xl font-semibold text-gray-800">{recompensaActual.nombre}</h3>
          <p className="text-gray-600">{recompensaActual.tipo}</p>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={manejarSiguiente}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {recompensaIndex < recompensas.length - 1 ? 'Siguiente' : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecompensaPopup;