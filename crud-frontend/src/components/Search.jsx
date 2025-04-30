import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('');

  const resultados = [
    {
      id: 1,
      nombre: "Guía Historia de México",
      materia: "Historia",
      autor: "Pedro Sánchez",
      academia: "Academia Historia",
      descripcion: "Explora la historia de México desde la época precolombina hasta la actualidad.",
      mesirve: "40",
      seguidores: "60",
      imagen: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      descripcionAutor: "Especialista en historia nacional con más de 20 años de experiencia.",
    },
    {
      id: 2,
      nombre: "Guía Matemáticas Avanzadas",
      materia: "Matemáticas",
      autor: "Lucía Fernández",
      academia: "Academia Matemáticas",
      descripcion: "Guía completa de matemáticas avanzadas.",
      mesirve: "50",
      seguidores: "50",
      imagen: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      descripcionAutor: "Profesora experta en álgebra y cálculo diferencial.",
    },
    {
      id: 3,
      nombre: "Guía Biología Molecular",
      materia: "Biología",
      autor: "Andrea Torres",
      academia: "Academia Biología",
      descripcion: "Introducción a los conceptos de biología molecular moderna.",
      mesirve: "30",
      seguidores: "30",
      imagen: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      descripcionAutor: "Doctora en genética con enfoque en biotecnología.",
    },
  ];

  const autoresUnicos = [...new Map(resultados.map(item => [item.autor, item])).values()];

  const resultadosFiltrados =
    filtro === "autor"
      ? autoresUnicos.filter((item) =>
          item.autor.toLowerCase().includes(busqueda.toLowerCase())
        )
      : resultados.filter((item) => {
          if (filtro === "materia") {
            return item.materia.toLowerCase().includes(busqueda.toLowerCase());
          } else if (filtro === "academia") {
            return item.academia.toLowerCase().includes(busqueda.toLowerCase());
          } else {
            return item.nombre.toLowerCase().includes(busqueda.toLowerCase());
          }
        });

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
                onClick={() =>
                  filtro === "autor" 
                    ? userData?.tipo_de_cuenta === 3 
                      ? navigate('/perfil/admin') 
                      : navigate('/perfil/usuario')
                    : navigate('/guia-seguida')
                }
              >
                <img
                  src={resultado.imagen}
                  alt={resultado.nombre}
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

                {filtro !== "autor" && (
                  <>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="cyan" viewBox="0 0 24 24" strokeWidth="0.5" stroke="black" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="font-medium">{resultado.seguidores}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                      </svg>
                      <span className="text-white font-medium">{resultado.mesirve}</span>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <li className="p-6 text-center text-gray-400">
              No se encontraron resultados.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
