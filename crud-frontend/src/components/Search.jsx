import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('');
  const [resultadosUsuarios, setResultadosUsuarios] = useState([]);
  const [resultadosGuias, setResultadosGuias] = useState([]);

  // Fetch para autores (tipo 1 y 2)
  useEffect(() => {
    const fetchAutores = async () => {
      if (filtro === "autor") {
        try {
          const id_usuario = userData?.id_usuario;
          const url = busqueda.trim()
            ? `http://localhost:4000/usuarios/autores?busqueda=${encodeURIComponent(busqueda)}&id_usuario=${id_usuario}`
            : `http://localhost:4000/usuarios/autores?id_usuario=${id_usuario}`;
          const res = await fetch(url);
          const data = await res.json();
          setResultadosUsuarios(data.map(usuario => ({
            id: usuario.id_usuario,
            autor: `${usuario.nombre} ${usuario.apellidos}`,
            descripcionAutor: usuario.descripcion || "Sin descripción.",
            imagen: `http://localhost:4000/avatar/imagen?id_usuario=${usuario.id_usuario}`,
          })));
        } catch (error) {
          console.error("Error al buscar autores:", error);
          setResultadosUsuarios([]);
        }
      } else {
        setResultadosUsuarios([]);
      }
    };

    fetchAutores();
  }, [busqueda, filtro]);

  // Fetch para guías por nombre (sin filtro aplicado)
  useEffect(() => {
    const fetchGuias = async () => {
      if (!filtro) {
        try {
          const id_usuario = userData?.id_usuario;
          const url = busqueda.trim()
            ? `http://localhost:4000/guias/buscar?busqueda=${encodeURIComponent(busqueda)}&id_usuario=${id_usuario}`
            : `http://localhost:4000/guias/buscar?id_usuario=${id_usuario}`;

          const res = await fetch(url);
          const data = await res.json();
          setResultadosGuias(data.map(guia => ({
            id: guia.id_gde,
            nombre: guia.nombre,
            descripcion: guia.descripcion,
            autor: `${guia.nombre_autor} ${guia.apellidos_autor}`,
            id_autor: guia.id_usuario,
            tipo_autor: guia.tipo_autor, // Nuevo campo
            seguidores: guia.num_seguidores,
            mesirve: guia.num_mesirve,
            materia: guia.nombre_materia,
            imagen: `http://localhost:4000/avatar/imagen?id_usuario=${guia.id_usuario}`
          })));
          
        } catch (error) {
          console.error("Error al buscar guías por nombre:", error);
          setResultadosGuias([]);
        }
      } else {
        setResultadosGuias([]);
      }
    };

    fetchGuias();
  }, [busqueda, filtro]);

  // Fetch para guías por materia (filtro: "materia")
  useEffect(() => {
    const fetchGuiasPorMateria = async () => {
      if (filtro === "materia") {
        try {
          const id_usuario = userData?.id_usuario;
          const url = busqueda.trim()
            ? `http://localhost:4000/guias/buscar-por-materia?nombre_materia=${encodeURIComponent(busqueda)}&id_usuario=${id_usuario}`
            : null;

          if (url) {
            const res = await fetch(url);
            const data = await res.json();
            setResultadosGuias(data.map(guia => ({
              id: guia.id_gde,
              nombre: guia.nombre,
              descripcion: guia.descripcion,
              autor: `${guia.nombre_autor} ${guia.apellidos_autor}`,
              id_autor: guia.id_usuario,
              tipo_autor: guia.tipo_autor,
              seguidores: guia.num_seguidores,
              mesirve: guia.num_mesirve,
              materia: guia.nombre_materia,
              imagen: `http://localhost:4000/avatar/imagen?id_usuario=${guia.id_usuario}`
            })));
          } else {
            setResultadosGuias([]);
          }
        } catch (error) {
          console.error("Error al buscar guías por materia:", error);
          setResultadosGuias([]);
        }
      }
    };

    fetchGuiasPorMateria();
  }, [busqueda, filtro]);


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
          
        </select>
      </div>

      {/* Resultados */}
      <div className="w-full max-w-5xl bg-base-100 rounded-box shadow-md max-h-[calc(6.5*100px)] overflow-y-auto">
        <ul>
          <li className="p-4 text-xs opacity-60 tracking-wide">Resultados encontrados</li>

          {resultadosFiltrados.length > 0 ? (
            resultadosFiltrados.map((resultado) => (
              <li
                key={resultado.id}
                className="flex items-center gap-4 px-3 py-4 border-b cursor-pointer hover:bg-gray-200"
                onClick={async () => {
                  if (filtro === "autor") {
                    localStorage.setItem("autorSeleccionado", JSON.stringify(resultado));
                    if (userData?.tipo_de_cuenta === 3) {
                      navigate("/perfil/admin");
                    } else {
                      navigate("/perfil/usuario");
                    }
                  } else {
                    try {
                      // Guardamos la guía seleccionada
                      localStorage.setItem("guiaSeleccionada", JSON.stringify(resultado));
                
                      // Consultamos si el usuario sigue la guía
                      const res = await fetch(`http://localhost:4000/guias/sigue?id_usuario=${userData.id_usuario}&id_gde=${resultado.id}`);
                      const data = await res.json();
                
                      if (data.sigue || userData?.tipo_de_cuenta === 3 || userData?.tipo_de_cuenta === 2) {
                        navigate("/guia-seguida");
                      } else {
                        navigate("/guia-sin-seguir");
                      }
                    } catch (error) {
                      console.error("Error al verificar si sigue la guía:", error);
                      navigate("/guia-sin-seguir"); 
                    }
                  }
                }}
                
              >
                <img
                  src={resultado.imagen}
                  alt={resultado.nombre || resultado.autor}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div className="flex flex-col flex-grow">
                {filtro === "autor" ? (
                  <>
                    <div className="font-semibold text-lg">{resultado.autor}</div>
                    <p className="text-sm text-gray-400 truncate">{resultado.descripcionAutor}</p>
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-lg flex items-center gap-2">
                      {resultado.nombre}
                      {resultado.tipo_autor === 2 && (
                        <img
                          src="/src/assets/SharkCheck.png" // Imagen de Check
                          alt="SharkCheck"
                          className="inline w-15 h-10 rounded-full"
                        />
                      )}
                    </div>
                    <p className="text-sm text-gray-300">Autor: {resultado.autor}</p>
                    <p className="text-sm text-gray-400 truncate">{resultado.descripcion}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span>📚 {resultado.materia}</span>
                      <span>👥 {resultado.seguidores}</span>
                      <span>⭐ {resultado.mesirve}</span>
                    </div>
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