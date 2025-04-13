import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reportes() {
    const navigate = useNavigate();

    const listaNegra = [
        { id: 1, nombre: "Carlos Méndez", descripcion: "Cuenta con historial de incumplimientos.", reportes: 5, img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
        { id: 2, nombre: "Mariana López", descripcion: "Publicó material engañoso.", reportes: 3, img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
        { id: 3, nombre: "Javier Ortega", descripcion: "Uso de lenguaje ofensivo.", reportes: 7, img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
        { id: 4, nombre: "Ana Ramírez", descripcion: "Intento de fraude con contenido falso.", reportes: 4, img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
        { id: 5, nombre: "Luis Paredes", descripcion: "Reincidente en conductas inapropiadas.", reportes: 6, img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
    ];

    const reportes = [
        { id: 1, guia: "Historia de México", usuario: "Pedro Sánchez", razon: "Plagio de contenido", img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
        { id: 2, guia: "Matemáticas Avanzadas", usuario: "Lucía Fernández", razon: "Lenguaje inapropiado", img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
        { id: 3, guia: "Cálculo Integral", usuario: "Roberto García", razon: "Contenido ofensivo", img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
        { id: 4, guia: "Biología Molecular", usuario: "Andrea Torres", razon: "Información falsa", img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
        { id: 5, guia: "Programación en Java", usuario: "Fernando Ruiz", razon: "Incumplimiento de normas", img: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-6">
            <h1 className="text-4xl font-bold text-center mb-6 w-full">Reportes</h1>
            <div className="flex flex-col lg:flex-row justify-between gap-6 w-full max-w-7xl">
                
                {/* Lista Negra */}
                <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-center">Lista Negra</h2>
                    <label className="input flex items-center border rounded-lg px-3 py-1">
                        <input type="search" className="grow ml-2 outline-none" placeholder="Buscar usuario" />
                    </label>
                    <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(4*100px)] overflow-y-auto">
                        <li className="p-4 text-xs opacity-60 tracking-wide">Usuarios en lista negra</li>
                        {listaNegra.map((usuario) => (
                            <li 
                                key={usuario.id} 
                                className="flex items-center gap-4 h-25 px-3 border-b cursor-pointer hover:bg-gray-200"
                                //onClick={() => {navigate(`/perfil/admin${usuario.id}`);}}
                                        
                                onClick={() => {navigate(`/perfil/admin`);}}
                            >
                                <img className="w-12 h-12 rounded-full" src={usuario.img} alt="Perfil" />
                                <div className="flex flex-col flex-grow">
                                    <div className="font-semibold text-lg">{usuario.nombre}</div>
                                    <p className="text-sm text-gray-600">{usuario.descripcion}</p>
                                    <span className="text-sm font-bold">Reportes: {usuario.reportes}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Lista de Reportes */}
                <div className="p-6 rounded-lg shadow-lg w-full lg:w-[600px] flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-center">Reportes por Revisar</h2>
                    <div className="flex items-center gap-2">
                        <label className="input flex-[3] flex items-center border rounded-lg px-3 py-1">
                            <input type="search" className="grow ml-2 outline-none" placeholder="Buscar reporte" />
                        </label>
                        <select defaultValue="Filtros" className="select border rounded-lg p-2 flex-[1]">
                            <option disabled>Filtros</option>
                        </select>
                    </div>
                    <ul className="bg-base-100 rounded-box shadow-md max-h-[calc(4*100px)] overflow-y-auto">
                        <li className="p-4 text-xs opacity-60 tracking-wide">Lista de reportes</li>
                        {reportes.map((reporte) => (
                            <li 
                                key={reporte.id} 
                                className="flex items-center gap-4 h-25 px-3 border-b cursor-pointer hover:bg-gray-200"
                                onClick={() => {navigate(`/ver-reporte`);}}
                            >
                                //<img className="w-12 h-12 rounded-full" src={reporte.img} alt="Perfil" />
                                
                                
                                <div className="flex flex-col flex-grow">
                                    <div className="font-semibold text-lg">{reporte.guia}</div>
                                    <p className="text-sm text-gray-600">Usuario: {reporte.usuario}</p>
                                    <p className="text-sm text-red-500">Razón: {reporte.razon}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
