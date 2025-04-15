import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function GuiaSinSeguir() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("Lógica básica de algoritmia");
    const [autor, setAutor] = useState("Salvador Arredondo Carbajal");
    const [materia, setMateria] = useState("Fundamentos de Programación");
    const [academia, setAcademia] = useState("Algoritmia y Programación");
    const [progAcad, setProgAcad] = useState("ISC");
    const [planDEst, setPlanDEst] = useState("ISC(2009)");
    const [version, setVersion] = useState("1");
    const [desc, setDesc] = useState(            
        "Guía de estudio que contiene preguntas básicas para desarrollar la lógica de los algoritmos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper."
    );
    const [tipo, setTipo] = useState("Curricular"); 
    const [preguntas, setPreguntas] = useState([
        "Pregunta 1",
        "Pregunta 2",
        "Pregunta 3",
        "Pregunta 4",
        "Pregunta 5",
        "Pregunta 6"
    ]);

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6">Vista Previa</h1>
            <div className="p-4 max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Columna Izquierda - Información de la Guía */}
                    <div className="w-full lg:w-1/2 border border-gray-500 p-4 rounded-lg shadow-xl">
                        <h2 className="text-3xl font-bold mb-4">Información de la Guía</h2>
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg mx-auto mb-4">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt="Avatar del usuario"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <ul className="space-y-2">
                            <li><strong>Nombre: </strong>{nombre}</li>
                            <li><strong>Autor: </strong>{autor}</li>
                            {tipo === "Curricular" && (
                                <>
                                    <li><strong>Materia: </strong>{materia}</li>
                                    <li><strong>Academia: </strong>{academia}</li>
                                    <li><strong>Programa Académico: </strong>{progAcad}</li>
                                    <li><strong>Plan de Estudio: </strong>{planDEst}</li>
                                    <li><strong>Versión de la guía: </strong>{version}</li>
                                </>
                            )}
                            <li><strong>Descripción: </strong>
                                <p className="text-gray-300 max-h-40 overflow-y-auto">{desc}</p>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Columna Derecha - Lista de Preguntas */}
                    <div className="w-full lg:w-1/2">
                        <div className="flex justify-end mb-2">
                            <button className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => navigate('/reporte')}>
                                Reportar
                            </button>
                        </div>
                        <ul className="bg-base-100 rounded-box shadow-md h-[400px] overflow-y-auto">
                            <li className="p-4 text-xs opacity-60 tracking-wide font-semibold">Lista de Preguntas</li>                
                            {preguntas.map((pregunta, index) => (
                                <li key={index} className="flex items-center gap-4 px-3 border-b py-2">
                                    <div className="flex flex-col flex-grow">
                                        <div className="font-semibold text-lg">{pregunta}</div>
                                        <p className="text-sm text-gray-600">Esta es una descripción de {pregunta}.</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {/* Botones Finales */}
                <div className="flex justify-center gap-4 mt-6">
                    <button className="btn btn-primary btn-lg text-lg" onClick={() => navigate('/quiz-guia')}>Iniciar Sesión de Estudio</button>
                    <button className="btn btn-secondary btn-lg text-lg" onClick={() => navigate('/guia-seguida')}>Seguir</button>
                </div>
            </div>
        </>
    );
}
