export default function CrearGuia() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Crear Guía de Estudio</h1>

            {/* Contenedor principal con distribución 1 - 2 - 1 */}
            <div className="flex flex-col gap-8">
                
                {/* 1️⃣ Radio Buttons */}
                <div className="flex flex-col items-center gap-4">
                    <legend className="font-semibold text-lg">Tipo de Guía</legend>
                    <div className="flex gap-4">
                        <input type="radio" name="radio-1" className="radio" defaultChecked />
                        <label className="text-lg">Curricular</label>
                        <input type="radio" name="radio-1" className="radio" />
                        <label className="text-lg">Extracurricular</label>
                    </div>
                </div>

                {/* 2️⃣ Grupo de Selects y Text Inputs */}
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Grupo de Selects */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
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

                    {/* Grupo de Text Inputs */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6 flex-grow">
                        <fieldset>
                            <legend className="font-semibold mb-2 text-lg">Nombre de la Guía</legend>
                            <input type="text" placeholder="Escribe aquí" className="input text-lg" />
                        </fieldset>

                        <fieldset className="flex flex-col flex-grow">
                            <legend className="font-semibold mb-2 text-lg">Descripción</legend>
                            <textarea className="textarea text-lg flex-1 min-h-[150px]" placeholder="Escribe una descripción"></textarea>
                        </fieldset>
                    </div>
                </div>

                {/* 3️⃣ Botones */}
                <div className="flex justify-center gap-4">
                    <button className="btn btn-primary btn-lg text-lg w-40">Crear</button>
                    <button className="btn btn-secondary btn-lg text-lg w-40">Cancelar</button>
                </div>
            </div>
        </div>
    );
}
