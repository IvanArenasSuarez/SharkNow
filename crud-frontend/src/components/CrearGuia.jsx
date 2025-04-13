import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrearGuia() {
    
    const navigate = useNavigate();

    const gotoEditarGuia = () => {
        navigate('/editar-guia')
    }
    const gotoMisGuias = () => {
        navigate("/mis-guias");
      };
    
    const [tipoGuia, setTipoGuia] = React.useState("curricular");
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Crear Guía de Estudio</h1>

            {/* Contenedor principal con distribución 1 - 2 - 1 */}
            <div className="flex flex-col gap-8">
                
                {/* Radio Buttons */}
                <div className="flex flex-col items-center gap-4">
                    <legend className="font-semibold text-lg">Tipo de Guía</legend>
                    <div className="flex gap-4">
                        <input 
                            type="radio" 
                            name="radio-1" 
                            className="radio" 
                            value="curricular"
                            checked={tipoGuia === "curricular"}
                            onChange={() => setTipoGuia("curricular")} 
                        />
                        <label className="text-lg">Curricular</label>

                        <input 
                            type="radio" 
                            name="radio-1" 
                            className="radio" 
                            value="extracurricular"
                            checked={tipoGuia === "extracurricular"}
                            onChange={() => setTipoGuia("extracurricular")} 
                        />
                        <label className="text-lg">Extracurricular</label>
                    </div>
                </div>

                {/* Grupo de Selects y Text Inputs */}
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Grupo de Selects*/}
                    {tipoGuia === "curricular" && (
                        <div className="w-full lg:w-[50%] flex flex-col gap-6">
                            <fieldset>
                                <legend className="font-semibold mb-2 text-lg">Materia</legend>
                                <select className="select text-lg">
                                    <option disabled>Seleccione una opción</option>
                                    <option>Crimson</option>
                                    <option>Amber</option>
                                    <option>Velvet</option>
                                </select>
                            </fieldset>

                            <fieldset>
                                <legend className="font-semibold mb-2 text-lg">Academia</legend>
                                <select className="select text-lg">
                                    <option disabled>Seleccione una opción</option>
                                    <option>Crimson</option>
                                    <option>Amber</option>
                                    <option>Velvet</option>
                                </select>
                            </fieldset>

                            <fieldset>
                                <legend className="font-semibold mb-2 text-lg">Departamento</legend>
                                <select className="select text-lg">
                                    <option disabled>Seleccione una opción</option>
                                    <option>Crimson</option>
                                    <option>Amber</option>
                                    <option>Velvet</option>
                                </select>
                            </fieldset>

                            <fieldset>
                                <legend className="font-semibold mb-2 text-lg">Programa Académico</legend>
                                <select className="select text-lg">
                                    <option disabled>Seleccione una opción</option>
                                    <option>Crimson</option>
                                    <option>Amber</option>
                                    <option>Velvet</option>
                                </select>
                            </fieldset>

                            <fieldset>
                                <legend className="font-semibold mb-2 text-lg">Plan de Estudio</legend>
                                <select className="select text-lg">
                                    <option disabled>Seleccione una opción</option>
                                    <option>Crimson</option>
                                    <option>Amber</option>
                                    <option>Velvet</option>
                                </select>
                            </fieldset>
                        </div>
                    )}

                    {/* Grupo de Text Inputs */}
                    <div className={`w-full ${tipoGuia === "curricular" ? "lg:w-[50%]" : "lg:w-full"} flex flex-col gap-6 flex-grow items-center justify-center`}>
                        <fieldset className="w-full max-w-lg">
                            <legend className="font-semibold mb-2 text-lg">Nombre de la Guía</legend>
                            <input type="text" className="input text-lg" />
                        </fieldset>

                        <fieldset className="w-full max-w-lg flex flex-col flex-grow">
                            <legend className="font-semibold mb-2 text-lg">Descripción</legend>
                            <textarea className="textarea text-lg flex-1 min-h-[150px] w-full" placeholder="Escribe una descripción"></textarea>
                        </fieldset>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-center gap-4">
                    <button onClick={gotoEditarGuia} className="btn btn-primary btn-lg text-lg w-40">Crear</button>
                    <button onClick={() => navigate(-1)} className="btn btn-secondary btn-lg text-lg w-40">Cancelar</button>
                </div>
            </div>
        </div>
    );
}
