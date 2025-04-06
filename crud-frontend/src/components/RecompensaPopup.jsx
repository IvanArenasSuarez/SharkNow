import React, { useState, useEffect } from 'react';

function RecompensaPopup({ recompensas, onCerrar }) {
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    if (recompensas.length === 0) return;
    setIndiceActual(0); // Reinicia al primera recompensa cuando la lista de recompensas cambie
  }, [recompensas]);

  if (recompensas.length === 0) return null;

  const recompensa = recompensas[indiceActual];
  const imagenPath = `/assets/${recompensa.tipo}/${recompensa.imagen}`;

  const handleSiguiente = () => {
    setIndiceActual((prevIndice) => (prevIndice + 1) % recompensas.length);
  };

  const handleCerrar = () => {
    onCerrar();
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#fff',
        color: '#333',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000,
        width: '300px',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={imagenPath}
          alt={recompensa.nombre}
          style={{ width: '50px', height: '50px', marginRight: '16px' }}
        />
        <div>
          <strong>¡Nueva recompensa desbloqueada!</strong>
          <div>{recompensa.nombre}</div>
        </div>
      </div>
      <div>
        <button
          onClick={handleSiguiente}
          style={{
            padding: '8px 16px',
            margin: '0 8px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Siguiente
        </button>
        <button
          onClick={handleCerrar}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default RecompensaPopup;
