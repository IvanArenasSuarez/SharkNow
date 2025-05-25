import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [datosUsuario, setDatosUsuario] = useState(null);
  const [guiasDelAutor, setGuiasDelAutor] = useState([]);

  const [puedeTransferir, setPuedeTransferir] = useState(false);
  const [transferenciaAcademia, setTransferenciaAcademia] = useState(null);
  const [isTransferirAlertVisible, setIsTransferirAlertVisible] = useState(false);

  // Obtener datos del usuario seleccionado
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

  // Obtener guías del autor
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

  // Verificar si se puede transferir la característica
  useEffect(() => {
    const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));
    if (!autor?.id || !userData?.id_usuario) return;

    fetch(`http://localhost:4000/perfil/verificar-transferencia-jefe?id_origen=${userData.id_usuario}&id_destino=${autor.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.puede_transferir) {
          setPuedeTransferir(true);
          setTransferenciaAcademia({
            id_academia: data.id_academia,
            nombre_academia: data.nombre_academia
          });
        }
      })
      .catch(err => {
        console.error("Error al verificar transferencia de jefatura:", err);
      });
  }, []);

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

              {puedeTransferir && (
                <button
                  onClick={() => setIsTransferirAlertVisible(true)}
                  className="btn bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Transferir característica de academia
                </button>
              )}
            </div>
          </div>

          {/* Lado derecho: guías */}
          <div className="bg-gray-800 w-full md:w-3/4 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-4">Guías del Usuario</h1>
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

                      try {
                        const res = await fetch(`http://localhost:4000/guias/sigue?id_usuario=${userData.id_usuario}&id_gde=${guia.id_gde}`);
                        const data = await res.json();
                        navigate(data.sigue || userData?.tipo_de_cuenta === 2 ? '/guia-seguida' : '/guia-sin-seguir');
                      } catch (error) {
                        console.error("Error al verificar seguimiento de guía:", error);
                        navigate('/guia-sin-seguir');
                      }
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
        </div>
      </div>

      {/* Modal de transferencia */}
      {isTransferirAlertVisible && (
        <div className="bg-gray-900 fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Transferencia de característica</h3>
            <p>
              Está a punto de transferir su característica de jefe en la academia{" "}
              <strong>{transferenciaAcademia?.nombre_academia}</strong> a este usuario. ¿Desea continuar?
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="btn bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                onClick={async () => {
                  try {
                    const autor = JSON.parse(localStorage.getItem("autorSeleccionado"));
                    
                    const resQuitar = await fetch("http://localhost:4000/perfil/quitar-jefe", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        id_usuario: userData.id_usuario,
                        id_academia: transferenciaAcademia.id_academia
                      }),
                    });

                    const resAsignar = await fetch("http://localhost:4000/perfil/asignar-jefe", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        id_usuario: autor.id,
                        id_academia: transferenciaAcademia.id_academia
                      }),
                    });

                    if (!resAsignar.ok || !resQuitar.ok) {
                      throw new Error("Error al realizar la transferencia.");
                    }

                    alert("Transferencia de característica completada.");
                    setIsTransferirAlertVisible(false);
                    window.location.reload();

                  } catch (err) {
                    console.error("Error al transferir característica:", err);
                    alert("Ocurrió un error al transferir la característica.");
                    setIsTransferirAlertVisible(false);
                  }
                }}               

              >
                Aceptar
              </button>
              <button
                className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                onClick={() => setIsTransferirAlertVisible(false)}
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
