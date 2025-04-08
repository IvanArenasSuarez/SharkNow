import { isCancel } from "axios";
import { useState } from "react";


export default function UserProfileAdmin() {
  // Estados para el usuario visualizado
  const [tipoCuenta, setTipoCuenta] = useState(2);
  const [tieneCaracteristicaAcademia, setTieneCaracteristicaAcademia] = useState(true);

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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.2fr] gap-5">
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
                  
                  {tipoCuenta === 2 && tieneCaracteristicaAcademia === false && alguienTieneCaracteristicaAcademia === false && ( 
                    <li><a onClick={handleAsignacionCaracteristica}>Asignar característica</a></li>
                  )}
                  {tipoCuenta === 2 && tieneCaracteristicaAcademia === true && ( 
                    <li><a onClick={handleQuitarCaracteristica}>Quitar característica</a></li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold mb-4">
                {tipoCuenta === 1 ? "Alumno" : "Profesor"}
              </h1>
              <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gray-400 shadow-lg">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Avatar del usuario"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 space-y-4 w-full">
                <div>
                  <h3 className="text-lg font-medium">Nombre(s)</h3>
                  <p className="text-gray-300">Salvador Iván</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Apellido(s)</h3>
                  <p className="text-gray-300">Arredondo Moguel</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Correo electrónico</h3>
                  <p className="text-gray-300">arredondo@ipn.mx</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Descripción</h3>
                  <p className="text-gray-300">Profesor de la materia de Algoritmia y Programación, me ubico en el salón 4201.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Guías */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Guías del Usuario</h2>
            <ul className="rounded-lg shadow-md max-h-[calc(6*100px)] overflow-y-auto">
              {[...Array(8)].map((_, index) => (
                <li key={index} className="flex items-center gap-4 p-4 rounded-lg shadow">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                    alt="Perfil"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">Lógica básica de algoritmia {index + 1}</h3>
                    <p className="text-sm text-gray-400">Guía de estudio que contiene preguntas básicas para desarrollar la lógica de los algoritmos.</p>
                  </div>
                  {/* Icono de estrella y número */}
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <span className="text-white font-medium">10</span>
                  </div>
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

          {/* Sección de Reportes Anteriores */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-1">
            <h2 className="text-2xl font-bold mb-4">Reportes Anteriores</h2>
            <ul className="rounded-lg shadow-md max-h-[calc(6*100px)] overflow-y-auto">
              {[...Array(3)].map((_, index) => (
                <li key={index} className="p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Lógica básica de algoritmia {index + 1}</h3>
                  <p className="text-sm text-gray-400">Contenido ofensivo o discurso de odio</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Alerta de confirmación */}
      {isDeleteAlertVisible && (
        <div className="bg-gray-800 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
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
        <div className="bg-gray-800 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
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
        <div className="bg-gray-800 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
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
        <div className="bg-gray-800 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
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
        <div className="bg-gray-800 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
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
