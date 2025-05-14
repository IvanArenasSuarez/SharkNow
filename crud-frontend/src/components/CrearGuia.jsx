import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrearGuia() {
    const navigate = useNavigate();
    const [tipoGuia, setTipoGuia] = React.useState("curricular");

    const [datosGuia, setDatosGuia] = React.useState({
        id: 0,
        tipo: "curricular",
        materia: "",
        plan: "",
        nombre: "",
        descripcion: "",
        version: 1,
        publicada: "n",
        seguidores: 0,
    });

    const [opciones, setOpciones] = useState({
        materias: [],
        academias: [],
        planes: []
    });

    const [filtros, setFiltros] = useState({
        plan: "",
        academia: ""
    });

    const materiasFiltradas = opciones.materias.filter(m => 
        (!filtros.plan || m.id_pde === parseInt(filtros.plan)) &&
        (!filtros.academia || m.id_academia === parseInt(filtros.academia))
    );

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value}));
        setDatosGuia(prev => ({ ...prev, [name]: value}));

        if (name === 'plan' || name === 'academia') {
            setDatosGuia(prev => ({ ...prev, materia: ""}));
        }
    };

    useEffect(() => {
        async function cargarOpciones() {
            try {
                const response = await fetch('http://localhost:4000/guias/parametros');
                if (!response.ok) throw new Error("Error al obtener las opciones");

                const data = await response.json();
                setOpciones({
                    materias: data.materias,
                    academias: data.academias,
                    planes: data.plan
                });
            }
            catch(err) {
                console.error("Error cargando opciones: ", err);
            }
        }

        cargarOpciones();
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosGuia(prev => ({ ...prev, [name]: value }));
    };

    const handleCrear = () => {
        localStorage.setItem("guia", JSON.stringify(datosGuia));
        console.table(datosGuia);
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
                            <fieldset>
                                <legend className='font-semibold mb-2 text-lg'>Plan</legend>
                                <select
                                    className='select text-lg'
                                    name='plan'
                                    value={filtros.plan}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="">Seleccione un plan</option>
                                        {opciones.planes.map(plan => (
                                            <option key={plan.id_pde} value={plan.id_pde}>
                                                {plan.nombre}
                                            </option>
                                        ))}
                                </select>
                            </fieldset>

                            <fieldset>
                                <legend className='font-semibold mb-2 text-lg'>Academia</legend>
                                <select
                                    className='select text-lg'
                                    name='academia'
                                    value={filtros.academia}
                                    onChange={handleFiltroChange}
                                >
                                    <option value="">Seleccione una academia</option>
                                    {opciones.academias.map(aca => (
                                        <option key={aca.id_academia} value={aca.id_academia}>
                                            {aca.nombre}
                                        </option>
                                    ))}
                                </select>
                            </fieldset>

                            <fieldset>
                                <legend className='font-semibold mb-2 text-lg'>Materia</legend>
                                <select
                                    className='select text-lg'
                                    name='materia'
                                    value={datosGuia.materia}
                                    onChange={handleChange}
                                    disabled={materiasFiltradas.length === 0}
                                >
                                    <option value="">Seleccione una materia</option>
                                    {materiasFiltradas.map(mat => (
                                        <option key={mat.id_materias} value={mat.id_materias}>
                                            {mat.nombre}
                                        </option>
                                    ))}
                                </select>
                            </fieldset>
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
