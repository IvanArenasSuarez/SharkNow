import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon } from "lucide-react";

export default function NavbarAdmin() {
  const navigate = useNavigate();
 
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
          onClick={() => navigate("/reportes")}
          className="text-3xl font-bold btn btn-ghost hover:bg-blue-600 transition"
        >
          SharkNow
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-bold px-4 gap-x-20">
          <li>
            <a onClick={() => navigate("/reportes")} className="text-xl">Reportes</a>
          </li>
          <li>
            <a onClick={() => navigate("/busqueda")} className="text-xl">Búsqueda</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
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
              <a onClick={handleLogout}>Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}