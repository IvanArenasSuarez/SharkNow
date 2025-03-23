import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();

    const gotoAvatar = () => {
      navigate('/avatar');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-4xl font-bold text-white text-center mb-6">Mi Perfil</h1>

        {/* Contenedor de perfil en dos columnas */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-20">
          
          {/* Lado izquierdo: Avatar y botón de personalización */}
          <div className="flex flex-col items-center">
            <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Avatar del usuario"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={gotoAvatar}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Personalizar
            </button>
          </div>

          {/* Lado derecho: Información del usuario */}
          <div className="w-full md:w-1/2 p-6 rounded-lg shadow-md">
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white">Nombre(s)</h3>
                <input
                  type="text"
                  placeholder="Nombre del usuario"
                  className="input input-bordered w-full md:w-2/3 p-3 rounded-lg text-base"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Apellido(s)</h3>
                <input
                  type="text"
                  placeholder="Apellidos del usuario"
                  className="input input-bordered w-full md:w-2/3 p-3 rounded-lg text-base"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Descripción</h3>
                <textarea
                  placeholder="Descripción del usuario"
                  rows="6" 
                  className="w-full md:w-2/3 p-3 rounded-lg border border-gray-600 resize-y text-base"
                ></textarea>
              </div>
            </div>

            <button
              onClick={() => console.log("Modificar Datos")}
              className="mt-6 w-mid px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Modificar Datos
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}