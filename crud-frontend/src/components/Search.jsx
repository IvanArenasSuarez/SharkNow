import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('');
  const [resultadosUsuarios, setResultadosUsuarios] = useState([]);
  const [resultadosGuias, setResultadosGuias] = useState([]); // Para uso futuro

  // Consulta dinámica de usuarios tipo 1 y 2
  useEffect(() => {
    const fetchAutores = async () => {
      if (filtro === "autor") {
        try {
          const url = busqueda.trim()
            ? `http://localhost:4000/usuarios/autores?busqueda=${encodeURIComponent(busqueda)}`
            : `http://localhost:4000/usuarios/autores`;
  
          const res = await fetch(url);
          const data = await res.json();
  
          setResultadosUsuarios(data.map(usuario => ({
            id: usuario.id_usuario,
            autor: `${usuario.nombre} ${usuario.apellidos}`,
            descripcionAutor: usuario.descripcion || "Sin descripción.",
            imagen: "http://localhost:4000/avatar/imagen?id_usuario=" + usuario.id_usuario,
          })));
        } catch (error) {
          console.error("Error al buscar autores:", error);
          setResultadosUsuarios([]);
        }
      } else {
        setResultadosUsuarios([]); // Limpiar resultados si cambia el filtro
      }
    };
  
    fetchAutores();
  }, [busqueda, filtro]);
  

  // Lista de resultados a renderizar
  const resultadosFiltrados = filtro === "autor" ? resultadosUsuarios : resultadosGuias;

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-6">
      <h1 className="text-4xl font-bold text-center mb-6 w-full">Buscar Guías</h1>

      {/* Input de búsqueda y filtros */}
      <div className="flex items-center gap-2 mb-4 w-full max-w-5xl">
        <label className="input flex-[3] flex items-center border rounded-lg px-3 py-1">
          <input
            type="search"
            className="grow ml-2 outline-none"
            placeholder="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </label>

        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="select border rounded-lg p-2 flex-[1]"
        >
          <option value="">Filtros</option>
          <option value="materia">Materia</option>
          <option value="autor">Autor</option>
          <option value="academia">Academia</option>
        </select>
      </div>

      {/* Lista de resultados con tamaño fijo y scroll */}
      <div className="w-full max-w-5xl bg-base-100 rounded-box shadow-md max-h-[calc(6.5*100px)] overflow-y-auto">
        <ul>
          <li className="p-4 text-xs opacity-60 tracking-wide">Resultados encontrados</li>

          {resultadosFiltrados.length > 0 ? (
            resultadosFiltrados.map((resultado) => (
              <li
                key={resultado.id}
                className="flex items-center gap-4 h-25 px-3 border-b cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  if (filtro === "autor") {
                    localStorage.setItem("autorSeleccionado", JSON.stringify(resultado));
                
                    if (userData?.tipo_de_cuenta === 3) {
                      navigate("/perfil/admin");
                    } else {
                      navigate("/perfil/usuario");
                    }
                  } else {
                    navigate("/guia-sin-seguir");
                  }
                }}
              >
                <img
                  src={resultado.imagen} 
                  alt={resultado.nombre || resultado.autor}
                  className="w-12 h-12 rounded-full"
                />

                <div className="flex flex-col flex-grow">
                  {filtro === "autor" ? (
                    <>
                      <div className="font-semibold text-lg">{resultado.autor}</div>
                      <p className="text-sm text-gray-400 truncate">{resultado.descripcionAutor}</p>
                    </>
                  ) : (
                    <>
                      <div className="font-semibold text-lg">{resultado.nombre}</div>
                      <p className="text-sm text-gray-300">Autor: {resultado.autor}</p>
                      <p className="text-sm text-gray-400 truncate">{resultado.descripcion}</p>
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="p-6 text-center text-gray-400">No se encontraron resultados.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
