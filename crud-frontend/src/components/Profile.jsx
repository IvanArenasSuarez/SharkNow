import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Nuevos estados para los datos del usuario
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const gotoAvatar = () => {
    navigate("/avatar");
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData.id_usuario) return;

        const response = await fetch(`http://localhost:4000/avatar/imagen?id_usuario=${userData.id_usuario}`);
        if (!response.ok) throw new Error("No se pudo cargar la imagen");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAvatarUrl(url);
      } catch (error) {
        console.error("Error al cargar el avatar:", error);
      }
    };

    const fetchDatosPerfil = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData.id_usuario) return;

        const response = await fetch(`http://localhost:4000/perfil/datos?id_usuario=${userData.id_usuario}`);
        if (!response.ok) throw new Error("No se pudieron cargar los datos del perfil");

        const data = await response.json();
        setNombre(data.nombre || "");
        setApellidos(data.apellidos || "");
        setCorreo(data.correo || "");
        setDescripcion(data.descripcion || "");
      } catch (error) {
        console.error("Error al cargar los datos del perfil:", error);
      }
    };

    fetchAvatar();
    fetchDatosPerfil();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData || !userData.id_usuario) return;

      const response = await fetch(`http://localhost:4000/perfil/actualizar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: userData.id_usuario,
          nombre,
          apellidos,
          descripcion,
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar datos");

      alert("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Hubo un problema al actualizar los datos ");
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-4xl font-bold text-white text-center mb-6">Mi Perfil</h1>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-20">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-52 h-52 rounded-full overflow-hidden shadow-lg bg-gray-700">
              <img
                src={avatarUrl || "/src/assets/Shark1.png"}
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

          {/* Datos del usuario */}
          <div className="w-full md:w-1/2 p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white">Nombre(s)</h3>
                <input
                  type="text"
                  placeholder="Nombre del usuario"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="input input-bordered w-full md:w-2/3 p-3 rounded-lg text-base"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Apellido(s)</h3>
                <input
                  type="text"
                  placeholder="Apellidos del usuario"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  className="input input-bordered w-full md:w-2/3 p-3 rounded-lg text-base"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Descripción</h3>
                <textarea
                  placeholder="Descripción del usuario"
                  rows="6"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full md:w-2/3 p-3 rounded-lg border border-gray-600 resize-y text-base"
                ></textarea>
              </div>
            </div>

            <button
              onClick={handleUpdateProfile}
              className="mt-6 w-mid px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Modificar Datos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
