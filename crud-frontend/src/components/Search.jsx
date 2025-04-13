import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(""); // Cambio a un solo filtro
  const [results, setResults] = useState([]);

  const filterOptions = [
    "Materia",
    "Autor",
    "Academia",
    "Plan de estudios",
    "Más 'Me sirve'",
    "Más Seguidores",
  ];

  const handleSearch = () => {
    console.log("Buscando:", searchQuery);
    console.log("Filtro aplicado:", selectedFilter);

    setResults([
      `Resultado 1 para "${searchQuery}" con filtro: ${selectedFilter}`,
      `Resultado 2 para "${searchQuery}" con filtro: ${selectedFilter}`,
      `Resultado 3 para "${searchQuery}" con filtro: ${selectedFilter}`,
      `Resultado 4 para "${searchQuery}" con filtro: ${selectedFilter}`,
      `Resultado 5 para "${searchQuery}" con filtro: ${selectedFilter}`,
      `Resultado 6 para "${searchQuery}" con filtro: ${selectedFilter}`,
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow">
        {/* Título */}
        <h1 className="text-4xl font-bold text-white text-center mb-6">Búsqueda</h1>

        {/* Barra de búsqueda, filtros y botón */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          
          <input
            type="search"
            placeholder="Escribe aquí tu búsqueda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full md:w-2/3 p-3 rounded-lg"
          />
                    
          {/* Select de filtros */}
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="select select-bordered p-2 w-full md:w-1/6 rounded-lg"
          >
            <option value="" disabled>Filtros</option>
            {filterOptions.map((filter) => (
              <option key={filter} value={filter}>{filter}</option>
            ))}
          </select>

          {/* Botón de búsqueda */}
          <button
            onClick={handleSearch}
            className="btn bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>

        {/* Contenedor de resultados */}
        <div className="p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-2">Resultados</h2>

          {/* Lista de resultados con tamaño fijo y scroll */}
          <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(5*100px)] overflow-y-auto">
            {results.length > 0 ? (
              results.map((result, index) => (
                <li key={index} className="flex items-center gap-4 h-25 px-3 border-b">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                    alt="Resultado"
                  />
                  <div className="flex flex-col flex-grow">
                    <div className="font-semibold text-lg">Lógica básica de algoritmia {index + 1}</div>
                    <p className="text-sm text-gray-300">{result}</p>
                  </div>
                  
                  {/* Icono de estrella y número */}
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <span className="text-white font-medium">10</span>
                  </div>

                  {/* Botón de acción (Icono de ojo) */}
                  <button className="btn btn-square btn-ghost"   
                  onClick={() => {
                      if (userData?.tipo_de_cuenta === 3) {
                        navigate('/perfil/admin');
                      } else {
                        navigate('/perfil/usuario');
                      }
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-4.8 0-9 5.6-9 7.5s4.2 7.5 9 7.5 9-5.6 9-7.5-4.2-7.5-9-7.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                  </button>

                  <button 
                    onClick={() => navigate("/guia-seguida")}
                    className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                <path d="m4.5 12.75 6 6 9-13.5"></path>
                            </g>
                        </svg>
                    </button>
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500 text-center">No hay resultados.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}