import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfileAdmin() {

  const navigate = useNavigate();

  // Estados para el usuario visualizado
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [guiasDelAutor, setGuiasDelAutor] = useState([]);
  const [tieneCaracteristicaAcademia, setTieneCaracteristicaAcademia] = useState(false);

  // Ya esta asignada la característica de academia para alguna de las academias a las que pertenece el usuario
  const [alguienTieneCaracteristicaAcademia, setAlguienTieneCaracteristicaAcademia] = useState(false);
  const [academiasDisponibles, setAcademiasDisponibles] = useState([]);
  const [academiaSeleccionada, setAcademiaSeleccionada] = useState(null);
  
  const [academiaAQuitar, setAcademiaAQuitar] = useState(null);

  // Estado para el usuario al que restringiremos la cuenta
  const [tieneRestriccion, setTieneRestriccion] = useState(false);

  // Estado para manejar la alerta de confirmación de eliminaciónes
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);
  const [isRestrictAlertVisible, setIsRestrictAlertVisible] = useState(false);
  const [isRestoreAlertVisible, setIsRestoreAlertVisible] = useState(false);
  const [isAsignacionAlertVisible, setIsAsignacionAlertVisible] = useState(false);
  const [isQuitarAlertVisible, setIsQuitarAlertVisible] = useState(false);

 
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
  
  // Obtener guías del autor seleccionado
  useEffect(() => {
  const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));
  if (autor?.id) {
    fetch(`http://localhost:4000/guias/por-usuario?id_usuario=${autor.id}`)
      .then(res => res.json())
      .then(data => {
        setGuiasDelAutor(data);
      })
      .catch(err => {
        console.error("Error al obtener guías del autor:", err);
      });
  }
  }, []);


  useEffect(() => {
  const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));
  if (!autor?.id) return;

  fetch(`http://localhost:4000/perfil/verificar-jefe?id_usuario=${autor.id}`)
    .then(res => res.json())
    .then(data => {
      // ¿Es jefe en alguna academia?
      const esJefeEnAlguna = data.some(reg => reg.es_jefe);
      setTieneCaracteristicaAcademia(esJefeEnAlguna);

      // ¿Tiene al menos una academia sin jefe?
      const puedeSerJefe = data.some(reg => reg.academia_tiene_jefe === false);
      setAlguienTieneCaracteristicaAcademia(puedeSerJefe);
    })
    .catch(err => {
      console.error("Error al verificar jefe de academia:", err);
    });
  }, []);

  const obtenerAcademiasDisponibles = async () => {
    const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));
    if (!autor?.id) return;

    try {
      const res = await fetch(`http://localhost:4000/perfil/verificar-jefe?id_usuario=${autor.id}`);
      const data = await res.json();
      const disponibles = data.filter(academia => !academia.yaTieneJefe && !academia.esJefe);
      setAcademiasDisponibles(disponibles);
    } catch (error) {
      console.error("Error al obtener academias disponibles:", error);
    }
  };


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
    obtenerAcademiasDisponibles(); // Cargar academias al abrir modal
    setIsAsignacionAlertVisible(true);
  };

  // Función para confirmar la asignacion de característica
  const handleConfirmAsignacion = async () => {
    const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));
    if (!autor?.id || !academiaSeleccionada) return;

    try {
      const res = await fetch("http://localhost:4000/perfil/asignar-jefe", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: autor.id,
          id_academia: academiaSeleccionada
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(`Error: ${data.message}`);
        return;
      }

      alert("Característica asignada correctamente.");
      setIsAsignacionAlertVisible(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al asignar característica:", error);
      alert("Ocurrió un error al asignar característica.");
    }
  };


  // Función para mostrar la alerta de quitar característica
  const handleQuitarCaracteristica = async () => {
    try {
      const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));

      const res = await fetch(`http://localhost:4000/perfil/verificar-jefe?id_usuario=${autor.id}`);
      const data = await res.json();

      // Encuentra la academia donde sea jefe
      const academiaJefe = data.find((a) => a.es_jefe === true);
      

      if (academiaJefe) {
        setAcademiaAQuitar(academiaJefe); // Guarda para mostrar y usar en la solicitud
        setIsQuitarAlertVisible(true);    // Muestra la alerta
      } else {
        alert("El usuario no es jefe de ninguna academia.");
      }

    } catch (err) {
      console.error("Error al verificar jefatura:", err);
    }
    
  };


  // Función para confirmar quitar de característica
  const handleConfirmQuitar = async () => {
    try {
      const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));

      const res = await fetch("http://localhost:4000/perfil/quitar-jefe", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: autor.id, id_academia: academiaAQuitar.id_academia }),

      });

      if (!res.ok) throw new Error("No se pudo quitar la característica.");

      alert("Se ha quitado correctamente la característica de academia.");
      window.location.reload();
    } catch (err) {
      console.error("Error al quitar característica:", err);
      alert("Ocurrió un error al quitar la característica.");
    } finally {
      setIsQuitarAlertVisible(false);
    }
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
                  {datosUsuario?.tipo === 2 &&
                    !tieneCaracteristicaAcademia &&
                    alguienTieneCaracteristicaAcademia &&
                    !tieneRestriccion && (
                      <li><a onClick={handleAsignacionCaracteristica}>Asignar característica</a></li>
                  )}

                  {datosUsuario?.tipo === 2  && tieneCaracteristicaAcademia === true&&( 
                    <li><a onClick={handleQuitarCaracteristica}>Quitar característica</a></li>
                  )}
                  
                  {tieneRestriccion === false && ( 
                    <li><a onClick={handleRestrictAccess}>Restringir acceso</a></li>
                  )}
                  {tieneRestriccion === true &&( 
                    <li><a onClick={handleRestoreAccess}>Restaurar acceso</a></li>
                  )}
                  {/* Opción de Eliminar cuenta */}
                  <li><a onClick={handleDeleteAccount}>Eliminar cuenta</a></li>
                  
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
                {guiasDelAutor.length > 0 ? (
                guiasDelAutor.map((guia) => (
                  <div
                    key={guia.id_gde}
                    onClick={async () => {
                      localStorage.setItem("guiaSeleccionada", JSON.stringify({
                        id: guia.id_gde,
                        nombre: guia.nombre,
                        descripcion: guia.descripcion,
                        autor: `${guia.nombre_autor} ${guia.apellidos_autor}`,
                        id_autor: guia.id_usuario,
                        tipo_autor: guia.tipo_autor,
                        seguidores: guia.num_seguidores,
                        mesirve: guia.num_mesirve,
                        materia: guia.nombre_materia,
                        estado: guia.estado,
                      }));
                       navigate('/guia-seguida');
                    }}
                    className="cursor-pointer rounded-lg p-4 flex items-center gap-4 shadow hover:bg-gray-700 transition"
                  >
                    <img
                      src={`http://localhost:4000/avatar/imagen?id_usuario=${guia.id_usuario}`}
                      alt={guia.nombre}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg flex items-center gap-2">
                        {guia.nombre}
                        {guia.tipo_autor === 2 && guia.estado === 'P' && (
                          <img
                            src="/src/assets/SharkCheck.png"
                            alt="SharkCheck"
                            className="inline w-15 h-10 rounded-full"
                          />
                        )}
                        {guia.estado === 'V' && (
                          <img
                            src="/src/assets/SharkVerify.png" // Imagen de Check
                            alt="SharkVerify"
                            className="inline w-15 h-10 rounded-full"
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-300">Autor: {guia.nombre_autor} {guia.apellidos_autor}</p>
                      <p className="text-sm text-gray-400 truncate">{guia.descripcion}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                        <span>📚 {guia.nombre_materia}</span>
                        <span>👥 {guia.num_seguidores}</span>
                        <span>⭐ {guia.num_mesirve}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">Este usuario no ha publicado ninguna guía.</p>
              )}

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
        <div className="bg-gray-900 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
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
        <div className="bg-gray-900 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
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
        <div className="bg-gray-900 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
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
        <div className="bg-gray-900 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Asignar característica de academia</h3>
            <p className="mb-4">Selecciona la academia a la que se le asignará la característica a este usuario:</p>
            
            <select
              className="select select-bordered w-full mb-4 bg-white text-black"
              value={academiaSeleccionada || ""}
              onChange={(e) => setAcademiaSeleccionada(e.target.value)}
            >
              <option value="" disabled>Selecciona una academia</option>
              {academiasDisponibles.map((a) => (
                <option key={a.id_academia} value={a.id_academia}>{a.nombre_academia}</option>
              ))}
            </select>

            <div className="flex justify-end gap-4">
              <button
                className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                onClick={handleConfirmAsignacion}
                disabled={!academiaSeleccionada}
              >
                Aceptar
              </button>
              <button
                className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                onClick={() => setIsAsignacionAlertVisible(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}


      {isQuitarAlertVisible && (
        <div className="bg-gray-900 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">¡Atención!</h3>
            <p>
              Está a punto de quitar la característica de academia al usuario en la academia: 
              <strong className="ml-1">{academiaAQuitar?.nombre_academia || 'Academia desconocida'}</strong>.
              ¿Estás seguro?
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                onClick={handleConfirmQuitar} 
              >
                Aceptar
              </button>
              <button
                className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                onClick={() => setIsQuitarAlertVisible(false)} 
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}