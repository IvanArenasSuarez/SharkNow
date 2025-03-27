import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Avatar() {
  const navigate = useNavigate();

  // Estado de personalización del avatar
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null); // Marco
  const [selectedHat, setSelectedHat] = useState(null);

  // Estado para el desplazamiento de los carruseles
  const [characterIndex, setCharacterIndex] = useState(0);
  const [badgeIndex, setBadgeIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [hatIndex, setHatIndex] = useState(0);

  const maxVisibleImages = 5; // Máximo de imágenes visibles a la vez

  // Lista de imágenes de prueba (En el futuro vendrán de la base de datos)
  const sampleImages = [
    "src/assets/1.jpg",
    "src/assets/2.jpg",
    "src/assets/3.jpg",
    "src/assets/4.jpg",
    "src/assets/fondo.jpg",
    "src/assets/reward1.jpg",
    "src/assets/reward2.jpg",
    "src/assets/MARCO.png",
    "src/assets/MARCO2.png",
  ];

  const handleSave = () => {
    console.log("Avatar guardado con:", { selectedCharacter, selectedBadge, selectedFrame, selectedHat });
    alert("Avatar actualizado correctamente.");
    navigate(-1);
  };

  // Función para mover el carrusel correctamente
  const moveCarousel = (setIndex, currentIndex, images, direction) => {
    if (direction === "left" && currentIndex > 0) {
      setIndex(currentIndex - 1);
    } else if (direction === "right" && currentIndex + maxVisibleImages < images.length) {
      setIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="container mx-auto p-8 flex-grow">
        
        {/* Contenedor principal en 2 columnas */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          
          {/* Lado izquierdo (Previsualización del avatar) */}
          <div className="w-full md:w-1/3 flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">Personalizar Avatar</h1>
            <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg bg-gray-700 flex items-center justify-center">
              {/* Imagen base del avatar (Personaje seleccionado) */}
              <img
                src={selectedCharacter || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt="Avatar del usuario"
                className="w-full h-full object-cover"
              />
              {selectedHat && <img src={selectedHat} className="absolute top-0 w-20" alt="Sombrero" />}
              {selectedBadge && <img src={selectedBadge} className="absolute bottom-0 w-14 mb-1 z-20" alt="Insignia" />}
              {selectedFrame && (
                <img src={selectedFrame} className="absolute inset-0 w-full h-full z-10" alt="Marco" />
              )}
            </div>

            {/* Botones debajo del avatar */}
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

          {/* Lado derecho (Opciones de personalización) */}
          <div className="w-full md:w-2/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Selecciona tus elementos</h2>

            {/* Secciones de personalización con carruseles centrados */}
            {[
              { title: "Personaje", images: sampleImages, state: selectedCharacter, setState: setSelectedCharacter, index: characterIndex, setIndex: setCharacterIndex },
              { title: "Insignia", images: sampleImages, state: selectedBadge, setState: setSelectedBadge, index: badgeIndex, setIndex: setBadgeIndex },
              { title: "Marco", images: sampleImages, state: selectedFrame, setState: setSelectedFrame, index: frameIndex, setIndex: setFrameIndex },
              { title: "Sombrero", images: sampleImages, state: selectedHat, setState: setSelectedHat, index: hatIndex, setIndex: setHatIndex },
            ].map(({ title, images, state, setState, index, setIndex }) => (
              <div key={title} className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
                <div className="flex items-center justify-center gap-3">
                  {/* Botón izquierdo */}
                  <button
                    className={`btn btn-circle ${index === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => moveCarousel(setIndex, index, images, "left")}
                    disabled={index === 0}
                  >
                    ❮
                  </button>

                  {/* Contenedor del carrusel con imágenes más grandes y centradas */}
                  <div className="flex gap-3 overflow-hidden w-[600px] justify-center">
                    {images.slice(index, index + maxVisibleImages).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className={`cursor-pointer w-24 h-24 rounded-lg border-2 transition ${
                          state === img ? "border-blue-500" : "border-gray-500"
                        }`}
                        onClick={() => setState(img)}
                        alt={title}
                      />
                    ))}
                  </div>

                  {/* Botón derecho */}
                  <button
                    className={`btn btn-circle ${index + maxVisibleImages >= images.length ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => moveCarousel(setIndex, index, images, "right")}
                    disabled={index + maxVisibleImages >= images.length}
                  >
                    ❯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
