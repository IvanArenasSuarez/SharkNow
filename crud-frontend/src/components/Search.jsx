import { useState } from "react";
import Footer from "../components/Footer";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [results, setResults] = useState([]);

  const filterOptions = [
    "Academia",
    "Plan de estudios",
    "Materia",
    "Carrera",
  ];

  const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleSearch = () => {
    console.log("Buscando:", searchQuery);
    console.log("Filtros aplicados:", selectedFilters);

    setResults([
      `Resultado 1 para "${searchQuery}" con filtros: ${selectedFilters.join(", ")}`,
      `Resultado 2 para "${searchQuery}" con filtros: ${selectedFilters.join(", ")}`,
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow">
        {/* Título */}
        <h1 className="text-4xl font-bold text-white text-center mb-6">Búsqueda</h1>

        {/* Barra de búsqueda y botón */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Escribe aquí tu búsqueda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full md:w-2/3 p-3 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="btn bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>

        {/* Sección de filtros */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Filtros</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {filterOptions.map((filter) => (
              <label key={filter} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  className="checkbox checkbox-primary"
                />
                <span className="text-gray-700">{filter}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Contenedor de resultados */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Resultados</h2>
          <div className="h-80 overflow-y-auto border rounded-lg p-3">
            {results.length > 0 ? (
              results.map((result, index) => (
                <p key={index} className="text-gray-700 mb-2">
                  {result}
                </p>
              ))
            ) : (
              <p className="text-gray-500 text-center">Los resultados aparecerán aquí.</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}