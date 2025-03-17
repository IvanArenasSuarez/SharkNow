import { useNavigate } from "react-router-dom";
import { BellIcon } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Token después de logout:", localStorage.getItem("token"));
    window.location.href = "/login";
  };    
  return (
    <div className="navbar bg-blue-600 shadow-md px-6">
      <div className="navbar-start">
        <button onClick={() => navigate("/Home")} className="text-2xl font-bold btn btn-ghost hover:bg-blue-600 transition">
            SharkNow
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-bold px-4 gap-x-10">
          <li>
            <a onClick={() => navigate("/mis-guias")}>Guías de Estudio</a>
          </li>
          <li>
            <a onClick={() => navigate("/busqueda")}>Búsqueda</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {/* Notificaciones */}
        <button className="btn btn-ghost btn-circle">
          <BellIcon className="w-6 h-6" />
        </button>

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
              <a onClick={() => navigate("/configuracion")}>Configuración</a>
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