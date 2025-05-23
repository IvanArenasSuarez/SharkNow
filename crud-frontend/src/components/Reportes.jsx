import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reportes() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [reportes, setReportes] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [listaNegraReal, setListaNegraReal] = useState([]);
  const [busquedaListaNegra, setBusquedaListaNegra] = useState("");
  const [listaNegraFiltrada, setListaNegraFiltrada] = useState([]);


  // Buscar reportes dinámicamente por nombre de guía y categoria
useEffect(() => {
  const fetchReportes = async () => {
    try {
      let query = "";

      if (searchTerm) {
        query += `nombre=${encodeURIComponent(searchTerm)}&`;
      }

      if (categoriaSeleccionada) {
        query += `categoria=${encodeURIComponent(categoriaSeleccionada)}&`;
      }

      const res = await fetch(`http://localhost:4000/reportes/buscar?${query}`);
      const data = await res.json();
      setReportes(data);
    } catch (error) {
      console.error("Error al buscar reportes:", error);
    }
  };

  fetchReportes();
}, [searchTerm, categoriaSeleccionada]);

useEffect(() => {
  fetch("http://localhost:4000/reportes/lista-negra")
    .then((res) => res.json())
    .then((data) => {
      setListaNegraReal(data);
    })
    .catch((err) => {
      console.error("Error al cargar la lista negra:", err);
    });
}, []);

useEffect(() => {
  if (!busquedaListaNegra.trim()) {
    setListaNegraFiltrada(listaNegraReal);
  } else {
    const filtro = busquedaListaNegra.toLowerCase();
    const resultados = listaNegraReal.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(filtro) ||
        usuario.apellidos.toLowerCase().includes(filtro)
    );
    setListaNegraFiltrada(resultados);
  }
}, [busquedaListaNegra, listaNegraReal]);



  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-6">
      <h1 className="text-4xl font-bold text-center mb-6 w-full">Reportes</h1>
      <div className="flex flex-col lg:flex-row justify-between gap-6 w-full max-w-7xl">
        
        {/* Lista de Reportes */}
        <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center">Reportes por Revisar</h2>
          <div className="flex items-center gap-2">
            <label className="input flex-[3] flex items-center border rounded-lg px-3 py-1">
              <input
                type="search"
                className="grow ml-2 outline-none"
                placeholder="Buscar reporte por guía"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <select
                className="select border rounded-lg p-2 flex-[1]"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                <option value="">Categorías</option>
                <option value="spam">Spam</option>
                <option value="disonancia">Disonancia</option>
                <option value="disc_odio">Discurso de odio</option>
                <option value="cont_exp">Contenido explícito</option>
            </select>

          </div>
          <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(4.5*100px)] overflow-y-auto">
            <li className="p-4 text-xs opacity-60 tracking-wide">Lista de reportes</li>
            {reportes.length > 0 ? (
              reportes.map((reporte) => (
                <li
                  key={reporte.id_reporte}
                  className="flex items-center gap-4 h-25 px-3 border-b cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    localStorage.setItem("reporteSeleccionado", JSON.stringify(reporte));
                    navigate("/ver-reporte");
                }}
                >
                  <img
                    className="w-12 h-12 rounded-full"
                    src={`http://localhost:4000/avatar/imagen?id_usuario=${reporte.id_usuario}`}
                    alt="Perfil"
                  />
                  <div className="flex flex-col flex-grow">
                    <div className="font-semibold text-lg">{reporte.nombre_guia}</div>
                    <p className="text-sm text-gray-300">
                      Autor: {reporte.nombre_autor} {reporte.apellidos_autor}
                    </p>
                    <p className="text-sm text-red-500">Categoría: {reporte.categoria}</p>
                    <p className="text-sm text-gray-400 truncate">{reporte.descripcion}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-sm text-gray-400 py-4">No se encontraron reportes.</li>
            )}
          </ul>
        </div>

        {/* Lista Negra (no modificada aún) */}
        <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center">Lista Negra</h2>
          <label className="input flex items-center border rounded-lg px-3 py-1">
            <input
                type="search"
                className="grow ml-2 outline-none"
                placeholder="Buscar usuario"
                value={busquedaListaNegra}
                onChange={(e) => setBusquedaListaNegra(e.target.value)}
            />
          </label>
          <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(4.5*100px)] overflow-y-auto">
            <li className="p-4 text-xs opacity-60 tracking-wide">Usuarios en lista negra</li>
                {listaNegraFiltrada.map((usuario) => (
                    <li
                    key={usuario.id_usuario}
                    className="flex items-center gap-4 h-25 px-3 border-b cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                        localStorage.setItem("autorSeleccionado", 
                        JSON.stringify({
                            id: usuario.id_usuario,
                            nombre: usuario.nombre,
                            apellidos: usuario.apellidos,
                        })
                        );
                        navigate("/perfil/admin");
                    }}
                    >
                    <img
                        className="w-12 h-12 rounded-full"
                        src={`http://localhost:4000/avatar/imagen?id_usuario=${usuario.id_usuario}`}
                        alt="Avatar"
                    />
                    <div className="flex flex-col flex-grow">
                        <div className="font-semibold text-lg">
                        {usuario.nombre} {usuario.apellidos}
                        </div>
                        <span className="text-sm font-bold">Reportes aceptados: {usuario.total_reportes}</span>
                    </div>
                    </li>
                ))}
            </ul>

        </div>
      </div>
    </div>
  );
}
