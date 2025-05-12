import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfileAdmin() {

  const navigate = useNavigate();

  // Estados para el usuario visualizado
  const [datosUsuario, setDatosUsuario] = useState(null);

  const [tieneCaracteristicaAcademia, setTieneCaracteristicaAcademia] = useState(false);

  // Ya esta asignada la característica de academia
  const [alguienTieneCaracteristicaAcademia, setAlguienTieneCaracteristicaAcademia] = useState(false);

  // Estado para el usuario al que restringiremos la cuenta
  const [tieneRestriccion, setTieneRestriccion] = useState(true);

  // Estado para manejar la alerta de confirmación de eliminaciónes
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);
  const [isRestrictAlertVisible, setIsRestrictAlertVisible] = useState(false);
  const [isRestoreAlertVisible, setIsRestoreAlertVisible] = useState(false);
  const [isAsignacionAlertVisible, setIsAsignacionAlertVisible] = useState(false);
  const [isQuitarAlertVisible, setIsQuitarAlertVisible] = useState(false);

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
  
  useEffect(() => {
      const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));
         
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

  // Función para mostrar la alerta de eliminación
  const handleDeleteAccount = () => {
    setIsDeleteAlertVisible(true);
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    // Aquí puedes agregar la operación de eliminación de la cuenta en la base de datos
    console.log("Cuenta eliminada");
    setIsDeleteAlertVisible(false);
  };

  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setIsDeleteAlertVisible(false);
  };

  // Función para mostrar la alerta de restricción
  const handleRestrictAccess = () => {
    setIsRestrictAlertVisible(true);
  };

  // Función para confirmar la restricción de acceso
  const handleConfirmRestrict = () => {
    // Aquí puedes agregar la operación de restricción de acceso en la base de datos
    console.log("Acceso restringido");
    setIsRestrictAlertVisible(false);
  };

  // Función para cancelar la restricción
  const handleCancelRestrict = () => {
    setIsRestrictAlertVisible(false);
  };

  // Función para mostrar la alerta de restaurar acceso
  const handleRestoreAccess = () => {
    setIsRestoreAlertVisible(true);
  };

  // Función para confirmar la restauración de acceso
  const handleConfirmRestore = () => {
    // Aquí puedes agregar la operación de restauración de acceso en la base de datos
    console.log("Acceso restaurado");
    setIsRestoreAlertVisible(false);
  };

  // Función para cancelar la restauración
  const handleCancelRestore = () => {
    setIsRestoreAlertVisible(false);
  };

  // Función para mostrar la alerta de asignar característica
  const handleAsignacionCaracteristica = () => {
    setIsAsignacionAlertVisible(true);
  };

  // Función para confirmar la asignacion de característica
  const handleConfirmAsignacion = () => {
    // Aquí puedes agregar la operación de asigancion en la base de datos
    console.log("Característica asignada");
    setIsAsignacionAlertVisible(false);
  };

  // Función para cancelar la asigancion
  const handleCancelAsignacion = () => {
    setIsAsignacionAlertVisible(false);
  };

  // Función para mostrar la alerta de quitar característica
  const handleQuitarCaracteristica = () => {
    setIsQuitarAlertVisible(true);
  };

  // Función para confirmar quitar de característica
  const handleConfirmQuitar = () => {
    // Aquí puedes agregar la operación de quitar en la base de datos
    console.log("Característica asignada");
    setIsQuitarAlertVisible(false);
  };

  // Función para cancelar quitar característica
  const handleCancelQuitar = () => {
    setIsQuitarAlertVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="container mx-auto p-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1.2fr] gap-5">
          {/* Sección de Perfil */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
            {/* Menú desplegable */}
            <div className="absolute top-4 right-4">
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-sm btn-ghost">
                  {/* Ícono de hamburguesa (tres líneas) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"  // Tamaño del ícono (ajustable)
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-700 rounded-box w-40">
                  {tieneRestriccion === false && ( 
                    <li><a onClick={handleRestrictAccess}>Restringir acceso</a></li>
                  )}
                  {tieneRestriccion === true &&( 
                    <li><a onClick={handleRestoreAccess}>Restaurar acceso</a></li>
                  )}
                  {/* Opción de Eliminar cuenta */}
                  <li><a onClick={handleDeleteAccount}>Eliminar cuenta</a></li>
                  
                  {datosUsuario?.tipo === 2  && tieneCaracteristicaAcademia === false && alguienTieneCaracteristicaAcademia === false && ( 
                    <li><a onClick={handleAsignacionCaracteristica}>Asignar característica</a></li>
                  )}
                  {datosUsuario?.tipo === 2  && tieneCaracteristicaAcademia === true && ( 
                    <li><a onClick={handleQuitarCaracteristica}>Quitar característica</a></li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold mb-4">
                {datosUsuario?.tipo === 1 ? "Alumno" : "Profesor"}
              </h1>
              <div className="w-44 h-44 rounded-full overflow-hidden shadow-lg">
                <img
                  src={`http://localhost:4000/avatar/imagen?id_usuario=${JSON.parse(localStorage.getItem("autorSeleccionado"))?.id}`}
                  alt="Avatar del usuario"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 space-y-4 w-full">
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
              </div>
            </div>
          </div>

          {/* Sección de Guías */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Guías del Usuario</h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {guiasUsuario.map((guia) => (
                <div
                key={guia.id}
                onClick={() => navigate("/guia-seguida")}
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

          {/* Sección de Reportes Anteriores */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Reportes Anteriores</h2>
            <ul className="rounded-lg shadow-md max-h-[calc(6*100px)] overflow-y-auto">
              {[...Array(3)].map((_, index) => (
                <li key={index} className="p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Reporte {index + 1}</h3>
                  <p className="text-sm text-gray-200">Guía: Lógica básica de algoritmia {index + 1}</p>
                  <p className="text-sm text-gray-400">Razón: Disonancia de Contenido</p>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Alerta de confirmación */}
      {isDeleteAlertVisible && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">¡Atención!</h3>
            <p>Este cambio es permanente. ¿Estás seguro de que deseas eliminar la cuenta?</p>
            <div className="mt-4 flex justify-end gap-4">
                <button className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handleConfirmDelete}>Aceptar</button>
                <button className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition" onClick={handleCancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {isRestrictAlertVisible && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">¡Atención!</h3>
            <p>Este cambio restringirá el acceso del usuario. ¿Estás seguro?</p>
            <div className="mt-4 flex justify-end gap-4">
                <button className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handleConfirmRestrict}>Aceptar</button>
                <button className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition" onClick={handleCancelRestrict}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {isRestoreAlertVisible && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">¡Atención!</h3>
            <p>Este cambio restaurará el acceso del usuario. ¿Estás seguro?</p>
            <div className="mt-4 flex justify-end gap-4">
                <button className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handleConfirmRestore}>Aceptar</button>
                <button className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition" onClick={handleCancelRestore}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {isAsignacionAlertVisible && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">¡Atención!</h3>
            <p>Esta a punto de asignar la característica de academia a este usuario. ¿Estás seguro?</p>
            <div className="mt-4 flex justify-end gap-4">
                <button className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handleConfirmAsignacion}>Aceptar</button>
                <button className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition" onClick={handleCancelAsignacion}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {isQuitarAlertVisible && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">¡Atención!</h3>
            <p>Esta a punto de quitar la característica de academia a este usuario. ¿Estás seguro?</p>
            <div className="mt-4 flex justify-end gap-4">
                <button className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={handleConfirmQuitar}>Aceptar</button>
                <button className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition" onClick={handleCancelQuitar}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}