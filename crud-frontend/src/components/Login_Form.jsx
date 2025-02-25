export default function Login_Form() {
    return(
        <>
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 rounded-lg shadow-lg w-80 flex flex-col gap-4">
                {/* Titulo */}
                <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
                {/* Datos de entrada */}
                <div className="flex flex-col gap-2">
                    <input type="text" className="input input-bordered" placeholder="Usuario" />
                    <input type="password" className="input input-bordered" placeholder="Contraseña" />
                </div>

                <button className="btn btn-link self-end">¿Olvidaste tu contraseña?</button>

                {/* Botones */}
                <div className="flex gap-2">
                    <button className="btn btn-primary flex-1">Iniciar Sesión</button>
                    <button className="btn btn-secondary flex-1">Registrarse</button>
                </div>
            </div>
        </div>
        </>
    )
}
