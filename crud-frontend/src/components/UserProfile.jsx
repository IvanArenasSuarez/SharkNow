import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  //Datos del usuario seleccionado
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [tieneCaracteristicaAcademia, setTieneCaracteristicaAcademia] = useState(false);

  // Datos del usario loggeado
  const [tipoCuenta2, setTipoCuenta2] = useState(null); 
  const [tieneCaracteristicaAcademia2, setTieneCaracteristicaAcademia2] = useState(true);
  const [yaSigue, setYaSigue] = useState(false);

  const [isTransferirAlertVisible, setIsTransferirAlertVisible] = useState(false);

  const guiasUsuario = [
    {
      id: 1,
      titulo: "Estructuras de datos básicas",
      descripcion: "Guía sobre listas, pilas, colas y árboles.",
      imagen: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      seguidores: 124,
      meSirve: 56,
    },
    {
      id: 2,
      titulo: "Introducción a programación en C",
      descripcion: "Explicación paso a paso para entender los fundamentos de C.",
      imagen: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      seguidores: 98,
      meSirve: 47,
    },
    {
      id: 3,
      titulo: "Algoritmos de búsqueda y ordenamiento",
      descripcion: "Guía completa sobre algoritmos de búsqueda y ordenamiento.",
      imagen: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      seguidores: 200,
      meSirve: 150,
    },
    {
      id: 4,
      titulo: "Programación orientada a objetos en Java",
      descripcion: "Todo lo que necesitas saber sobre POO en Java.",
      imagen: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      seguidores: 75,
      meSirve: 30,
    },
  ];

  // Obtener datos del usuario seleccionado al cargar la página
  useEffect(() => {
    const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));
    const tipoActual = JSON.parse(localStorage.getItem("userData"))?.tipo_de_cuenta;

    setTipoCuenta2(tipoActual);

    if (autor?.id) {
      fetch(`http://localhost:4000/perfil/datos?id_usuario=${autor.id}`)
        .then(res => res.json())
        .then(data => {
          setDatosUsuario(data);
        })
        .catch(err => {
          console.error("Error al cargar datos del perfil:", err);
        });
    }
  }, []);

  const handleTransferirCaracteristica = () => {
    setIsTransferirAlertVisible(true);
  };

  const handleConfirmTransferir = () => {
    console.log("Característica asignada");
    setIsTransferirAlertVisible(false);
  };

  const handleCancelTransferir = () => {
    setIsTransferirAlertVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Lado izquierdo: perfil */}
          <div className="bg-gray-800 w-full md:w-1/4 flex flex-col items-center p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-white text-center mb-6">
              {datosUsuario?.tipo === 1 ? "Alumno" : "Profesor"}
            </h1>
            <div className="w-44 h-44 rounded-full overflow-hidden shadow-lg">
              <img
                src={`http://localhost:4000/avatar/imagen?id_usuario=${JSON.parse(localStorage.getItem("autorSeleccionado"))?.id}`}
                alt="Avatar del usuario"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 space-y-4 w-full text-center">
              <div>
                <h3 className="text-lg font-medium text-white">Nombre(s)</h3>
                <p className="text-gray-300">{datosUsuario?.nombre}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Apellido(s)</h3>
                <p className="text-gray-300">{datosUsuario?.apellidos}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Correo electrónico</h3>
                <p className="text-gray-300">{datosUsuario?.correo}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Descripción</h3>
                <p className="text-gray-300">{datosUsuario?.descripcion || "Sin descripción."}</p>
              </div>
              {datosUsuario?.tipo === 2 && !tieneCaracteristicaAcademia && tipoCuenta2 === 2 && tieneCaracteristicaAcademia2 && (
                <button
                  onClick={handleTransferirCaracteristica}
                  className="btn bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Transferir característica de academia
                </button>
              )}
            </div>
          </div>

          {/* Lado derecho (guias del usuario ) */}
          <div className="bg-gray-800 w-full md:w-3/4 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-4">Guías del Usuario</h1>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {guiasUsuario.map((guia) => (
                <div
                key={guia.id}
                onClick={() => {
                  if (tipoCuenta2 === 1 && yaSigue === false) {
                    navigate('/guia-sin-seguir');
                  } else {
                    navigate('/guia-seguida');
                  }
                }}
                className="cursor-pointer rounded-lg p-4 flex items-center gap-4 shadow hover:bg-gray-700 transition"
              >
                <img src={guia.imagen} alt={guia.titulo} className="w-20 h-20 rounded-full object-cover" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">{guia.titulo}</h2>
                  <p className="text-sm text-gray-300">{guia.descripcion}</p>
                  <div className="flex gap-4 mt-2 text-gray-300 text-sm">
                    <span>👥 {guia.seguidores} seguidores</span>
                    <span>⭐ {guia.meSirve} me sirve</span>
                  </div>
                </div>
              </div>             
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmación transferencia */}
      {isTransferirAlertVisible && (
        <div className="bg-gray-800 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">¡Atención!</h3>
            <p>Está a punto de transferir la característica de academia a este usuario. ¿Estás seguro?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handleConfirmTransferir}>Aceptar</button>
              <button className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition" onClick={handleCancelTransferir}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
