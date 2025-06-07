import { useState, useEffect, useRef } from "react";
import EditarPregunta from "./EditarPregunta";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export default function EditarGuia() {
  const refEditarPregunta = useRef();
  const navigate = useNavigate();
  const [esMaestro, setEsMaestro] = useState(false);
  const [enviarAcademia, setEnviarAcademia] = useState(false);  
  const [modalEnviar, setModalEnviar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const checkIcon = "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125";
  const deleteIcon = "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z";
  
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEsMaestro(decoded.tipo_de_cuenta === 2);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }

    let preguntas = localStorage.getItem("preguntas");
    if (!preguntas) {
        const initialData = {
            listado: [],
            nuevas: [],
            editadas: [],
            eliminadas: []
        };
        localStorage.setItem("preguntas", JSON.stringify(initialData));
        preguntas = initialData;
    } else {
        preguntas = JSON.parse(preguntas);
    }
  }, []);

  const [guia, setGuia] = useState(() => {
    const guiaGuardada = localStorage.getItem('guia');
    console.log(guiaGuardada);
    if (guiaGuardada) {
      return JSON.parse(guiaGuardada);
    }
    return {};
  });

  const handleChange = (e) => {
        const { name, value } = e.target;
        setGuia(prev => ({ ...prev, [name]: value }));
        localStorage.setItem("guia", JSON.stringify(guia));
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

            // Actualizar academia si la materia ya está seleccionada
            const materiaSeleccionada = data.materias.find(m => m.id_materias === guia.materia);

            if (materiaSeleccionada) {
                setGuia(prev => ({ ...prev, academia: materiaSeleccionada.id_academia }));
            }
            
        }
        catch (err) {
            console.error("Error cargando opciones: ", err);
        }
    }
    cargarOpciones();
  }, []);

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
        setGuia(prev => ({ ...prev, [name]: value}));
        if (name === 'plan' || name === 'academia') {
            setGuia(prev => ({ ...prev, materia: ""}));
        }
    };

  const [preguntas, setPreguntas] = useState(() => {
    const guardadas = localStorage.getItem("preguntas");
    if (!guardadas) return [];
    try {
      const datos = JSON.parse(guardadas);
      const listado = Array.isArray(datos.listado) ? datos.listado : [];
      const nuevas = Array.isArray(datos.nuevas) ? datos.nuevas : [];
      const editadas = Array.isArray(datos.editadas) ? datos.editadas : [];
      return [...listado, ...nuevas, ...editadas];
    } catch (error) {
      console.error("Error al parsear preguntas de localStorage:", error);
      return [];
    }
  });

  const mostrarPopupSiNecesario = () => {
    if (guia.estado==="P" && guia.seguidores > 0 && !popupShown) {
      setShowPopup(true);
    }
  };

  const confirmarNuevaVersion = () => {
    setGuia((prev) => ({
      ...prev,
      version: prev.version + 1,
    estado: "N",
    seguidores: 0
    }));
    setShowPopup(false);
    setPopupShown(true);
    handlePublicarOEnviar();
  };

  const modalRef = useRef();

  const [modalConfig, setModalConfig] = useState({
      modo: "crear",
      id: "modalpregunta",
      title: "Crear pregunta"
  });

const abrirModalCrear = () => {
  setModalConfig({
    id: "modalPregunta",
    modo: "crear",
    title: "Crear pregunta"
  });
};

const abrirModalEditar = (pregunta) => {
  setModalConfig({
    id: pregunta.id,
    modo: "editar",
    title: "Editar pregunta"
  });
};

const handleEliminarGuia = async () => {
    if (guia.estado === 'N' || (guia.estado === 'P' && guia.seguidores === 0)) {
        try {
            const token = localStorage.getItem('token'); // si usas autenticación con JWT
            const response = await fetch(`http://localhost:4000/guias/eliminar/${guia.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('No se pudo eliminar la guía');
            alert('Guía eliminada correctamente');
            navigate(-1);
        } catch (err) {
            console.error('Error al eliminar la guía:', err);
            alert('Error al eliminar la guía');
        }
    } else {
        alert('No se puede eliminar esta guía porque está publicada y tiene seguidores.');
    }
};


useEffect(() => {
    async function obtenerPreguntas() {
      try {
        const response = await fetch(`http://localhost:4000/guias/preguntas?id_guia=${guia.id}`); 
        if (!response.ok) throw new Error("Error al obtener las preguntas");
  
        const data = await response.json();
  
        // Guardamos en estado
        setPreguntas(data);
  
        // Guardamos en localStorage.preguntas.listado
        const preguntasStorage = JSON.parse(localStorage.getItem("preguntas"));
  
        preguntasStorage.listado = data;
        localStorage.setItem("preguntas", JSON.stringify(preguntasStorage));
      } catch (error) {
        console.error("Error al cargar preguntas:", error);
      }
    }
  
    obtenerPreguntas();
  }, []);

  useEffect(() => {
    if (modalConfig.modo && refEditarPregunta.current) {
        refEditarPregunta.current.openModal();
    }
  }, [modalConfig]);

  const handleEliminarPregunta = (id) => {
    mostrarPopupSiNecesario();
    const preguntasStorage = JSON.parse(localStorage.getItem("preguntas"));
    const { listado, nuevas, editadas, eliminadas } = preguntasStorage;
  
    // Buscar la pregunta por su id
    const todas = [...listado, ...nuevas, ...editadas];
    const preguntaEliminada = todas.find(p => p.id === id);
    if (!preguntaEliminada) return;
    const esDeNuevas = nuevas.some(p => p.id === id);
    if (!esDeNuevas) {    // Solo agregar a eliminadas si no es de nuevas
      eliminadas.push(preguntaEliminada);
    }
    ["listado", "nuevas", "editadas"].forEach(categoria => {    // Eliminar de su categoría original
      preguntasStorage[categoria] = preguntasStorage[categoria].filter(p => p.id !== id);
    });
    localStorage.setItem("preguntas", JSON.stringify(preguntasStorage));
    setPreguntas([
      ...preguntasStorage.listado,
      ...preguntasStorage.nuevas,
      ...preguntasStorage.editadas
    ]);
  };
  
const handlePublicar = () => {
  const guiaStorage = JSON.parse(localStorage.getItem('guia')) || guia;
  const preguntasStorage = JSON.parse(localStorage.getItem('preguntas'));

  const totalPreguntas =
    (preguntasStorage.nuevas.length) +
    (preguntasStorage.listado.length) +
    (preguntasStorage.editadas.length);

  if (totalPreguntas < 15) {
    alert(`Esta guía debe tener 15 o más preguntas. Solo contiene: ${totalPreguntas}`);
    return;
  }

  const token = localStorage.getItem("token");
  
  fetch('http://localhost:4000/guias/guardar', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ guia: guiaStorage, preguntas: preguntasStorage }),
  })
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => { throw new Error(text) });
    }
    return res.json();
  })
  .then(data => {
    // Después de guardar, proceder a publicar
    return fetch('http://localhost:4000/guias/publicar', {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ id_gde: guia.id }),
    });
  })
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => { throw new Error(text) });
    }
    return res.json();
  })
  .then(data => {
    if(esMaestro){
      navigate('/mis-guias-profesor');
    }else{
      navigate('/mis-guias');
    }
  })
  .catch(error => {
    console.error('Error al publicar la guía:', error);
    alert('Error al publicar la guía: ' + error.message);
  });
};

const handleEnviar = () => {
  const guiaStorage = JSON.parse(localStorage.getItem('guia')) || guia;
  const preguntasStorage = JSON.parse(localStorage.getItem('preguntas'));

  const totalPreguntas =
    (preguntasStorage.nuevas.length) +
    (preguntasStorage.listado.length) +
    (preguntasStorage.editadas.length);
/*
  if (totalPreguntas < 15) {
    alert(`Esta guía debe tener 15 o más preguntas. Solo contiene: ${totalPreguntas}`);
    return;
  }
*/
  const token = localStorage.getItem("token");
  
  fetch('http://localhost:4000/guias/guardar', {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ guia: guiaStorage, preguntas: preguntasStorage }),
  })
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => { throw new Error(text) });
    }
    return res.json();
  })
  .then(data => {
    // Después de guardar, proceder a publicar
    return fetch('http://localhost:4000/guias/enviarSolicitud', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ id_usuario: userData.id_usuario, id_gde: guia.id }),
    });
  })
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => { throw new Error(text) });
    }
    return res.json();
  })
  .then(data => {
    if(esMaestro){
      navigate('/mis-guias-profesor');
    }else{
      navigate('/mis-guias');
    }
  })
  .catch(error => {
    console.error('Error al Crear la solicitud:', error);
    alert('Error al crear la solicitud: ' + error.message);
  });
};

const handleGuardar = () => {
  const guiaStorage = JSON.parse(localStorage.getItem('guia')) || guia;
  const preguntasStorage = JSON.parse(localStorage.getItem('preguntas'));

  const token = localStorage.getItem("token");
  fetch('http://localhost:4000/guias/guardar', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' },
    body: JSON.stringify({ guia: guiaStorage, preguntas: preguntasStorage }),
  })
    .then(res => res.json())
    .then(data => {
      if(esMaestro)
        navigate('/mis-guias-profesor');
      else 
        navigate('/mis-guias');
    })
    .catch(error => {
      console.error('Error al guardar la guía:', error);
    });
  };

  // Tras cargar o editar la guía:
useEffect(() => {
  localStorage.setItem('guia', JSON.stringify(guia));
}, [guia]);

useEffect(() => {
  return () => {
    localStorage.removeItem("guia");
    localStorage.removeItem("preguntas");
  };
}, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Editar Guía de Estudio</h1>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md text-center shadow-lg">
            <p className="text-lg font-bold text-black mb-6">
              Esta guía ya está siendo seguida por otros usuarios. Se creará una nueva versión de esta guía. <br /> ¿Desea crear una nueva versión?
            </p>
            <button
              className="btn btn-primary mr-4"
              onClick={confirmarNuevaVersion}
            >
              Confirmar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowPopup(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-15">
        <div className="w-full lg:w-1/2 flex flex-col gap-6 min-h-[500px]">
          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Nombre de la guía</legend>
            <input name="nombre" type="text" className="input text-lg w-full" defaultValue={guia.nombre} onChange={handleChange} />
          </fieldset>

          {guia.tipo === "C" &&(

            <div className="w-full  flex flex-col gap-6">
                            <fieldset>
                                <legend className='font-semibold mb-2 text-lg'>Plan</legend>
                                <select
                                    className='select text-lg'
                                    name='plan'
                                    value={guia.plan}
                                    onChange={(e) => {handleChange(e); handleFiltroChange(e); }}
                                >
                                    <option value="">Seleccione un plan</option>
                                        {opciones.planes.map(plan => (
                                            <option key={plan.id_pde} value={parseInt(plan.id_pde)}>
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
                                    value={guia.academia}
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
                                    value={guia.materia}
                                    onChange={handleChange}
                                    disabled={materiasFiltradas.length === 0}
                                >
                                    <option value="">Seleccione una materia</option>
                                    {materiasFiltradas.map(mat => (
                                        <option key={mat.id_materias} value={parseInt(mat.id_materias)}>
                                            {mat.nombre}
                                        </option>
                                    ))}
                                </select>
                            </fieldset>
                        </div>

          )}
          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Versión</legend>
            <select className="select w-full" disabled={guia.estado==="P"} >
              <option>{guia.version}</option>
            </select>
          </fieldset>

          {esMaestro && (
            <fieldset>
              <input 
                type="checkbox"
                id="enviarAcademia"
                className="checkbox checkbox-info mr-2"
                checked={enviarAcademia}
                onChange={() => setEnviarAcademia(!enviarAcademia)}
              />
              <label htmlFor="enviarAcademia" className="ml-2">¿Desea enviar esta guía a revisión de academia?</label>
            </fieldset>
          )}

          <fieldset>
            <legend className="font-semibold mb-2 text-lg">Descripción</legend>
            <textarea name="descripcion" className="textarea text-lg flex-1 min-h-[150px] w-full" placeholder="Escribe una descripción" onChange={handleChange}>{guia.descripcion}</textarea>
          </fieldset>

            <div className="flex justify-between gap-4">
              {((guia.estado==="N") || (guia.estado==="P" && guia.seguidores > 0 && enviarAcademia)
                ) && (
                  <button 
                    className="btn btn-primary w-1/3 h-14 min-w-[120px]"
                    onClick={async() => {
                      if (guia.estado==="P" && guia.seguidores > 0 && !popupShown) {
                        setShowPopup(true);
                          } else {
                          if (enviarAcademia) {
                            try {
                              const token = localStorage.getItem("token");
                              console.log(guia.academia);
                              const res = await fetch(`http://localhost:4000/responsable-academia/${guia.academia}`, {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                }
                              });
                              const data = await res.json();
                              const nombreResponsable = data.nombre || "usuario responsable";
                              console.log(nombreResponsable);

                              // 2. Confirmar con el usuario
                              const confirmar = window.confirm(`¿Deseas enviar esta guía a ${nombreResponsable}?`);
                              if (confirmar) {
                                handleEnviar();
                              }
                            } catch (error) {
                              console.error("Error al obtener el nombre del usuario responsable:", error);
                              alert("No se pudo obtener el nombre del responsable. Intenta más tarde.");
                            }

                          } else {
                            // Publicar: cambiar estado localStorage y guardar
                            const guiaStorage = JSON.parse(localStorage.getItem("guia")) || guia;
                            guiaStorage.estado = "P";
                            localStorage.setItem("guia", JSON.stringify(guiaStorage));
                            handlePublicar();
                          }
                      }
                    }}>{enviarAcademia ? "Enviar" : "Publicar"}
                  </button>
              )}
              <button className="btn btn-accent w-1/3 h-14 min-w-[120px]" onClick={handleGuardar}>Guardar y Salir</button>
              <button className="btn btn-secondary w-1/3 h-14 min-w-[120px]" onClick={handleEliminarGuia}>Eliminar</button>
            </div>
            
        </div>

        {/* Lista de Preguntas */}
        <div className="w-full lg:w-1/2">
          <ul className="bg-base-100 rounded-box shadow-md h-[800px] overflow-y-auto">
            <li className="p-4 text-xs opacity-60 tracking-wide font-semibold">Lista de Preguntas</li>

            {preguntas.map((pregunta) => (
              <li key={pregunta.id} className="flex items-center gap-4 px-3 border-b py-2">
                <div className="flex flex-col flex-grow">
                  <div className="font-semibold text-lg">{pregunta.question}</div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => abrirModalEditar(pregunta)}
                    className="btn btn-square btn-ghost">
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                        <path d={checkIcon}></path>
                      </g>
                    </svg>
                  </button>
                  <button 
                    className="btn btn-square btn-ghost"
                    onClick={() => handleEliminarPregunta(pregunta.id)}
                  >
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                        <path d={deleteIcon}></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </li>
            ))}

            {/* Botón para añadir preguntas */}
            <li className="flex justify-center py-4">
            <button className="btn btn-outline btn-primary w-3/4 h-12" onClick={abrirModalCrear}>+ Añadir Pregunta</button>
              <EditarPregunta
                  ref={refEditarPregunta}
                  id={modalConfig.id}
                  title={modalConfig.title}
                  modo={modalConfig.modo}
                  onSave={() => {
                    const preguntasStorage = JSON.parse(localStorage.getItem("preguntas"));
                      setPreguntas([
                        ...preguntasStorage.listado,
                        ...preguntasStorage.nuevas,
                        ...preguntasStorage.editadas
                      ]);
                  }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}