import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "Nueva guía de estudio disponible",
      route: "/mis-guias",
    },
    {
      id: 2,
      message: "Tienes un mensaje en tu perfil",
      route: "/perfil",
    },
    {
      id: 3,
      message: "Configuración de cuenta actualizada",
      route: "/configuracion",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Token después de logout:", localStorage.getItem("token"));
    window.location.href = "/login";
  };

  const handleNotificationClick = (route) => {
    setNotificationsVisible(false); // Ocultar notificaciones después de hacer clic
    navigate(route); // Redirigir a la ruta asociada a la notificación
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
            <a onClick={() => navigate("/mis-guias")} className="text-xl">Guías de Estudio</a>
          </li>
          <li>
            <a onClick={() => navigate("/busqueda")} className="text-xl">Búsqueda</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {/* Notificaciones */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setNotificationsVisible(!notificationsVisible)}
        >
          <BellIcon className="w-6 h-6" />
        </button>

        {notificationsVisible && (
          <div className="absolute top-16 right-6 w-64 bg-white shadow-lg rounded-md p-4 z-50">
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="text-sm text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center gap-2"
                  onClick={() => handleNotificationClick(notification.route)}
                >
                  {/* Punto verde */}
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Perfil */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Perfil"
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