import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [avatarURL, setAvatarURL] = useState(null);
  const [tieneCaracteristicaAcademia, setTieneCaracteristicaAcademia] = useState(true);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 1,
      message: "Hay una nueva versión de una guía de estudio que sigues, ¡Revisala!",
      route: "/guia-sin-seguir",
    },
    {
      id: 2,
      type: 2,
      message: "Validación de academia rechazada, se solicitan modificaciones.",
      route: "/mis-guias-profesor",
    },
    {
      id: 3,
      type: 1,
      message: "Validación de academia aceptada",
      level: "3",
      route: "/mis-guias-profesor",
    },
    {
      id: 4,
      type: 1,
      message: "Se te ha transferido la característica de Academia",
      route: "/mis-guias-academia",
    },
    {
      id: 5,
      type: 2,
      message: "Se encontraron inconsistencias en tu guía de estudio",
      route: "/editar-guia",
    },
  ]);

  useEffect(() => {
    const fetchAvatarImage = async () => {
      try {
        const res = await fetch(`http://localhost:4000/avatar/imagen?id_usuario=${userData.id_usuario}`);
        const blob = await res.blob();
  
        if (blob.type.startsWith("image/")) {
          const imageURL = URL.createObjectURL(blob);
          setAvatarURL(imageURL);
        }
      } catch (error) {
        console.error("Error al obtener imagen del avatar:", error);
      }
    
      try {
      const decoded = jwt_decode(token);

      // Verificamos si es tipo 2 (profesor)
      if (decoded.tipo_de_cuenta === 2) {
        // Verificamos si tiene al menos una academia donde es jefe
        const academias = decoded.academias || [];
        const esJefeEnAlguna = academias.some(a => a.jefe === true);

        setTieneCaracteristicaAcademia(esJefeEnAlguna);
      } else {
        setTieneCaracteristicaAcademia(false);
      }
    } catch (err) {
      console.error("Error al decodificar el token:", err);
    }

    };
  
    if (userData?.id_usuario) {
      fetchAvatarImage();
    }
  
    // Escuchar evento global y recargar imagen cuando se actualice
    const handleAvatarUpdate = () => fetchAvatarImage();
    window.addEventListener("avatarActualizado", handleAvatarUpdate);
  
    // Limpieza del listener
    return () => {
      window.removeEventListener("avatarActualizado", handleAvatarUpdate);
    };
  }, []);

  useEffect(() => {
    const fetchAvatarImage = async () => {
      try {
        const res = await fetch(`http://localhost:4000/avatar/imagen?id_usuario=${userData.id_usuario}`);
        const blob = await res.blob();
  
        if (blob.type.startsWith("image/")) {
          const imageURL = URL.createObjectURL(blob);
          setAvatarURL(imageURL);
        }
      } catch (error) {
        console.error("Error al obtener imagen del avatar:", error);
      }
    };
  
    if (userData?.id_usuario) {
      fetchAvatarImage();
    }
  
    // Escuchar evento global y recargar imagen cuando se actualice
    const handleAvatarUpdate = () => fetchAvatarImage();
    window.addEventListener("avatarActualizado", handleAvatarUpdate);
  
    // Limpieza del listener
    return () => {
      window.removeEventListener("avatarActualizado", handleAvatarUpdate);
    };
  }, []);
  
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleNotificationClick = (route) => {
    setNotificationsVisible(false);
    navigate(route);
  };

  const handleRemoveNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };


const getDotColor = (type) => {
  switch (type) {
    case 1:
      return "bg-green-500";
    case 2:
      return "bg-orange-500";
    default:
      return "bg-gray-400";
  }
};


  return (
    <div className="navbar bg-blue-600 shadow-md px-6">
      <div className="navbar-start">
        <button
          onClick={() => navigate("/")}
          className="text-3xl font-bold btn btn-ghost hover:bg-blue-600 transition"
        >
          SharkNow
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-bold px-4 gap-x-20">
          <li>
            <a
              onClick={() => {
                if (userData?.tipo_de_cuenta === 2 && !tieneCaracteristicaAcademia) {
                  navigate("/mis-guias-profesor");
                }
                if (userData?.tipo_de_cuenta === 2 && tieneCaracteristicaAcademia) {
                  navigate("/mis-guias-academia");
                }
                if (userData?.tipo_de_cuenta === 1) {
                  navigate("/mis-guias");
                }
              }}
              className="text-xl"
            >
              Guías de Estudio
            </a>
          </li>
          <li>
            <a onClick={() => navigate("/busqueda")} className="text-xl">
              Búsqueda
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4 relative">
        {/* Notificaciones */}
        <button
          className="btn btn-ghost btn-circle relative"
          onClick={() => setNotificationsVisible(!notificationsVisible)}
        >
          <BellIcon className="w-6 h-6" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </button>

        {notificationsVisible && (
          <div className="absolute top-16 right-6 w-72 bg-white shadow-lg rounded-md p-4 z-50">
            {notifications.length === 0 ? (
              <p className="text-center text-sm text-gray-500">Sin notificaciones</p>
            ) : (
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="flex justify-between items-start p-2 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    <div
                      className="flex items-start gap-2 cursor-pointer w-full"
                      onClick={() => handleNotificationClick(notification.route)}
                    >
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${getDotColor(notification.type)} flex-shrink-0`}></span>
                      <span className="text-sm text-gray-800">{notification.message}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveNotification(notification.id)}
                      className="text-gray-400 hover:text-red-500 ml-2"
                      title="Eliminar"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Perfil */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <img
                src={avatarURL || "/src/assets/Shark1.png"}
                alt="Perfil"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-40 p-2 shadow"
          >
            <li>
              <a onClick={() => navigate("/perfil")}>Ver Perfil</a>
            </li>
            <li>
              <a onClick={handleLogout}>Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}