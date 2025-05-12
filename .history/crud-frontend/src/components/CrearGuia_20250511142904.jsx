import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrearGuia() {
    const navigate = useNavigate();
    const [tipoGuia, setTipoGuia] = React.useState("curricular");

    const [datosGuia, setDatosGuia] = React.useState({
        id: null,
        tipo: "curricular",
        materia: "",
        plan: "",
        nombre: "",
        descripcion: "",
        version: 1,
        publicada: "n",
        seguidores: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosGuia(prev => ({ ...prev, [name]: value }));
    };

    const handleCrear = () => {
        localStorage.setItem("guia", JSON.stringify(datosGuia));
        
        navigate('/editar-guia');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Crear Guía de Estudio</h1>

            <div className="flex flex-col gap-8">
                {/* Tipo de Guía */}
                <div className="flex flex-col items-center gap-4">
                    <legend className="font-semibold text-lg">Tipo de Guía</legend>
                    <div className="flex gap-4">
                        <input 
                            type="radio" 
                            name="tipo" 
                            className="radio" 
                            value="curricular"
                            checked={tipoGuia === "curricular"}
                            onChange={() => {
                                setTipoGuia("curricular");
                                setDatosGuia(prev => ({ ...prev, tipo: "curricular" }));
                            }}
                        />
                        <label className="text-lg">Curricular</label>

                        <input 
                            type="radio" 
                            name="tipo" 
                            className="radio" 
                            value="extracurricular"
                            checked={tipoGuia === "extracurricular"}
                            onChange={() => {
                                setTipoGuia("extracurricular");
                                setDatosGuia(prev => ({ ...prev, tipo: "extracurricular" }));
                            }}
                        />
                        <label className="text-lg">Extracurricular</label>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {tipoGuia === "curricular" && (
                        <div className="w-full lg:w-[50%] flex flex-col gap-6">
                            {["materia", "academia", "departamento", "programa", "plan"].map(field => (
                                <fieldset key={field}>
                                    <legend className="font-semibold mb-2 text-lg">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </legend>
                                    <select
                                        className="select text-lg"
                                        name={field}
                                        value={datosGuia[field]}
                                        onChange={handleChange}
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </fieldset>
                            ))}
                        </div>
                    )}

                    <div className={`w-full ${tipoGuia === "curricular" ? "lg:w-[50%]" : "lg:w-full"} flex flex-col gap-6 flex-grow items-center justify-center`}>
                        <fieldset className="w-full max-w-lg">
                            <legend className="font-semibold mb-2 text-lg">Nombre de la Guía</legend>
                            <input
                                type="text"
                                className="input text-lg w-full"
                                name="nombre"
                                value={datosGuia.nombre}
                                onChange={handleChange}
                            />
                        </fieldset>

                        <fieldset className="w-full max-w-lg flex flex-col flex-grow">
                            <legend className="font-semibold mb-2 text-lg">Descripción</legend>
                            <textarea
                                className="textarea text-lg flex-1 min-h-[150px] w-full"
                                placeholder="Escribe una descripción"
                                name="descripcion"
                                value={datosGuia.descripcion}
                                onChange={handleChange}
                            ></textarea>
                        </fieldset>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-center gap-4">
                    <button onClick={handleCrear} className="btn btn-primary btn-lg text-lg w-40">Crear</button>
                    <button onClick={() => navigate(-1)} className="btn btn-secondary btn-lg text-lg w-40">Cancelar</button>
                </div>
            </div>
        </div>
    );
}
