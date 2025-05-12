import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Avatar() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedHat, setSelectedHat] = useState(null);

  const [characterIndex, setCharacterIndex] = useState(0);
  const [badgeIndex, setBadgeIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [hatIndex, setHatIndex] = useState(0);

  const [characters, setCharacters] = useState([]);
  const [badges, setBadges] = useState([]);
  const [frames, setFrames] = useState([]);
  const [hats, setHats] = useState([]);

  const maxVisibleImages = 5;

  useEffect(() => {
    const fetchRecompensasYSeleccion = async () => {
      try {
        const res = await fetch("http://localhost:4000/avatar/opciones", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_usuario: userData.id_usuario })
        });
        const data = await res.json();
  
        setHats(data.sombreros);
        setCharacters(data.tiburones);
        setFrames(data.marcos);
        setBadges(data.insignias);
  
        // Luego de cargar las imágenes, obtener la selección actual del usuario
        const resSeleccion = await fetch(`http://localhost:4000/avatar/seleccion?id_usuario=${userData.id_usuario}`);
        if (!resSeleccion.ok) return;
  
        const seleccion = await resSeleccion.json();
  
        // Buscar la recompensa correspondiente por ID
        const buscarPorId = (array, id) => array.find(item => item.id === id);
  
        setSelectedHat(buscarPorId(data.sombreros, seleccion.id_sombrero));
        setSelectedCharacter(buscarPorId(data.tiburones, seleccion.id_tiburon));
        setSelectedFrame(buscarPorId(data.marcos, seleccion.id_marco));
        setSelectedBadge(buscarPorId(data.insignias, seleccion.id_insignia));
  
      } catch (error) {
        console.error("Error al cargar recompensas o selección:", error);
      }
    };
  
    fetchRecompensasYSeleccion();
  }, [userData.id_usuario]);
  

  const handleSave = async () => {
    const id_usuario = userData.id_usuario;

    try {
      const avatarData = {
        id_usuario,
        id_sombrero: selectedHat?.id || null,
        id_marco: selectedFrame?.id || null,
        id_insignia: selectedBadge?.id || null,
        id_tiburon: selectedCharacter?.id || null
      };

      const response = await fetch("http://localhost:4000/avatar/guardar-imagen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(avatarData)
      });

      if (!response.ok) throw new Error("Fallo al guardar");

      alert("Avatar actualizado correctamente.");
      window.dispatchEvent(new Event("avatarActualizado"));
      navigate(-1);
    } catch (error) {
      console.error("Error al guardar el avatar:", error);
    }
  };

  const moveCarousel = (setIndex, currentIndex, images, direction) => {
    if (direction === "left" && currentIndex > 0) {
      setIndex(currentIndex - 1);
    } else if (direction === "right" && currentIndex + maxVisibleImages < images.length) {
      setIndex(currentIndex + 1);
    }
  };

  const renderCarousel = (title, images, selected, setSelected, index, setIndex) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
      <div className="flex items-center justify-center gap-3">
        <button
          className={`btn btn-circle ${index === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => moveCarousel(setIndex, index, images, "left")}
          disabled={index === 0}
        >
          ❮
        </button>

        <div className="flex gap-3 overflow-hidden w-[600px] justify-center">
          {images.slice(index, index + maxVisibleImages).map((img, i) => (
            <img
              key={img.id}
              src={img.archivo}
              onError={() => console.error("Error cargando imagen:", img)}
              className={`cursor-pointer w-24 h-24 rounded-lg border-2 transition ${
                selected?.id === img.id ? "border-blue-500" : "border-gray-500"
              }`}
              onClick={() => setSelected(img)}
              alt={title}
            />
          ))}
        </div>

        <button
          className={`btn btn-circle ${index + maxVisibleImages >= images.length ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => moveCarousel(setIndex, index, images, "right")}
          disabled={index + maxVisibleImages >= images.length}
        >
          ❯
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="container mx-auto p-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Previsualización */}
          <div className="w-full md:w-1/3 flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">Personalizar Avatar</h1>
            <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-lg bg-gray-700 flex items-center justify-center">
              <img
                src={selectedCharacter?.archivo || "/src/assets/Shark1.png"}
                alt="Base"
                className="w-full h-full z-20 object-cover"
              />
              {selectedHat && <img src={selectedHat.archivo} className="absolute top-0 w-full h-full z-30" alt="Sombrero" />}
              {selectedBadge && <img src={selectedBadge.archivo} className="absolute bottom-0 w-14 mb-1 z-40" alt="Insignia" />}
              {selectedFrame && <img src={selectedFrame.archivo} className="absolute inset-0 w-full h-full z-10" alt="Marco" />}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full justify-center">
              <button
                onClick={handleSave}
                className="btn bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Guardar y Salir
              </button>
              <button
                onClick={() => navigate(-1)}
                className="btn bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>

          {/* Carruseles */}
          <div className="w-full md:w-2/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Selecciona tus elementos</h2>
            {renderCarousel("Sombrero", hats, selectedHat, setSelectedHat, hatIndex, setHatIndex)}
            {renderCarousel("Tiburón", characters, selectedCharacter, setSelectedCharacter, characterIndex, setCharacterIndex)}
            {renderCarousel("Marco", frames, selectedFrame, setSelectedFrame, frameIndex, setFrameIndex)}
            {renderCarousel("Insignia", badges, selectedBadge, setSelectedBadge, badgeIndex, setBadgeIndex)}
          </div>
        </div>
      </div>
    </div>
  );
}