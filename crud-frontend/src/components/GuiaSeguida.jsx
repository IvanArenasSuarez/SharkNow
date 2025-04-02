import { useState } from "react";

export default function GuiaSinSeguir() {
    const [nombre, setNombre] = useState("Lógica básica de algoritmia");
    const [autor, setAutor] = useState("Salvador Arredondo Carbajal");
    const [materia, setMateria] = useState("Fundamentos de Programación");
    const [academia, setAcademia] = useState("Algoritmia y Programación");
    const [progAcad, setProgAcad] = useState("ISC");
    const [planDEst, setPlanDEst] = useState("ISC(2009)");
    const [version, setVersion] = useState("1");
    const [desc, setDesc] = useState(            
        "Guía de estudio que contiene preguntas básicas para desarrollar la lógica de los algoritmos."
    );
    const [tipo, setTipo] = useState("Curricular"); 
    const [preguntas, setPreguntas] = useState([
        "¿Qué es un algoritmo?",
        "¿Cuál de los siguientes es un ejemplo de algoritmo de búsqueda?",
        " ¿Qué estructura de control es esencial en un algoritmo recursivo?",
        "¿Cuál es la complejidad temporal del algoritmo de ordenación BubbleSort en el peor caso?",
        "¿Qué técnica utiliza el algoritmo Divide y Vencerás?",
        "¿Cuál de estos es un algoritmo de recorrido de grafos?"
    ]);

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-8 mb-6">Vista Previa</h1>
            <div className="p-4 max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Columna Izquierda - Información de la Guía */}
                    <div className="w-full lg:w-1/2 border border-gray-500 p-4 rounded-lg shadow-xl ">
                        <h2 className="text-3xl text-center font-bold mb-4">Información de la Guía</h2>
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
                                <p className="text-gray-300 max-h-40 overflow-y-auto text-justify">{desc}</p>
                            </li>
                        </ul>
                        
                    </div>
                    
                    {/* Columna Derecha - Lista de Preguntas */}
                    <div className="w-full lg:w-3/4 ">
                        <div className="flex justify-end mb-2">
                        <button className="btn btn-sm flex items-center gap-1 bg-transparent hover:bg-transparent">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor" 
                                className="size-7 text-white hover:fill-yellow-400 hover:text-yellow-400 hover:stroke-yellow-400 transition-colors"
                            >
                                <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" 
                                />
                            </svg>
                            <span className="text-white text-xl font-medium">¿Te sirvio la guía?</span>
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
                        {/* Botones Finales */}
                        <div className="flex justify-center gap-4 mt-6">
                            <button className="btn btn-primary btn-lg text-lg">Iniciar Sesión de Estudio</button>
                            <button className="btn btn-secondary btn-lg text-lg">Dejar de Seguir</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}