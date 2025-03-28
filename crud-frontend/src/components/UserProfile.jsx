import { useState } from "react";
import Footer from "../components/Footer";

export default function UserProfile() {

  // Estados para el tipo de cuenta y la característica de academia del usuario que visualizamos
  const [tipoCuenta, setTipoCuenta] = useState(2);
  const [tieneCaracteristicaAcademia, setTieneCaracteristicaAcademia] = useState(false);
  // Estados para el tipo de cuenta y la característica de academia del usuario actual
  const [tipoCuenta2, setTipoCuenta2] = useState(2);
  const [tieneCaracteristicaAcademia2, setTieneCaracteristicaAcademia2] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow">

        {/* Contenedor principal en dos columnas */}
        <div className="flex flex-col md:flex-row gap-10">

          {/* Lado izquierdo (Perfil del usuario) */}
          <div className="bg-gray-800 w-full md:w-1/3 flex flex-col items-center p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-white text-center mb-6">
                {tipoCuenta === 1 ? "Alumno" : "Profesor"}
            </h1>
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Avatar del usuario"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-4 w-full text-center">
              <div>
                <h3 className="text-lg font-medium text-white">Nombre(s)</h3>
                <p className="text-gray-300">[Nombre del usuario]</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Apellido(s)</h3>
                <p className="text-gray-300">[Apellido del usuario]</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Correo electrónico</h3>
                <p className="text-gray-300">[Correo del usuario]</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Descripción</h3>
                <p className="text-gray-300">[Descripción del usuario]</p>
              </div>

              {/* Botón para transferir característica de academia */}
              {tipoCuenta === 2 && tieneCaracteristicaAcademia === false && tipoCuenta2 === 2 && tieneCaracteristicaAcademia2 && (
                <button className="btn bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                  Transferir característica de academia
                </button>
              )}
            </div>
          </div>

          {/* Lado derecho (Lista de guías) */}
          <div className="w-full md:w-2/3 p-6 rounded-lg shadow-lg ">
            <h1 className="text-2xl font-bold text-white mb-4">Guías del Usuario</h1>

            {/* Lista con scroll */}
            <ul className="rounded-lg shadow-md max-h-[calc(5*100px)] overflow-y-auto">
              {[...Array(6)].map((_, index) => (
                <li key={index} className="flex items-center gap-4 h-25 px-3 border-b border-gray-700">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                    alt="Perfil"
                  />
                  <div className="flex flex-col flex-grow">
                    <div className="font-semibold text-lg text-white">Guía {index + 1}</div>
                    <p className="text-sm text-gray-400">
                      Esta es una breve descripción de la guía publicada por el usuario.
                    </p>
                  </div>

                  {/* Icono de estrella y número */}
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <span className="text-white font-medium">10</span>
                  </div>

                  {/* Botón de acción (Icono de ojo) */}
                  <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-4.8 0-9 5.6-9 7.5s4.2 7.5 9 7.5 9-5.6 9-7.5-4.2-7.5-9-7.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}