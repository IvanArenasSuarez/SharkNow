
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sección Hero */}
      <section className="bg-base-100 py-20 px-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          
          {/* Lado izquierdo: Texto y botón */}
          <div className="md:w-1/2 text-left">
            <h1 className="text-5xl text-white font-bold">Bienvenido a</h1>
            <h1 className="text-8xl text-blue-400 font-bold">SharkNow</h1>
            <p className="mt-4 text-xl text-gray-200 max-w-md">
              La herramienta para el autoestudio basada en el método de aprendizaje de repetición 
              espaciada, la cual utiliza las guías de estudio creadas por la comunidad estudiantil de ESCOM
              para apoyarlos a memorizar temas de estudio de su interés.
            </p>
            {/* CAMBIAR DIRECCIÓN */}
            <button onClick={() => navigate("/busqueda")} className="mt-6 px-12 py-5 btn bg-blue-600 text-white justify-center text-xl font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Comenzar ahora
            </button>
          </div>

          {/* Lado derecho: Imagen ilustrativa */}
          <div className="md:w-3/5 flex justify-center mt-2 md:mt-0">
            <img src="/src/assets/Shark1.png" alt="Bienvenida SharkNow" className="w-full rounded-lg shadow-lg" />
          </div>

        </div>
      </section>

      {/* Sección: ¿Qué es SharkNow? con diseño en dos columnas */}
      <section className="bg-blue-900 py-16 px-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          
          {/* Lado izquierdo: Carrusel de imágenes */}
          <div className="md:w-1/2 flex justify-center">
            <div className="carousel w-full rounded-lg shadow-lg">
              <div id="slide1" className="carousel-item relative w-full">
                <img src="/src/assets/sharknow1.jpeg" className="w-full" alt="Slide 1" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide3" className="btn btn-circle">❮</a>
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
              </div>
              <div id="slide2" className="carousel-item relative w-full">
                <img src="/src/assets/sharknow2.jpeg" className="w-full" alt="Slide 2" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide1" className="btn btn-circle">❮</a>
                  <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
              </div>
              <div id="slide3" className="carousel-item relative w-full">
                <img src="/src/assets/sharknow3.jpeg" className="w-full" alt="Slide 3" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide2" className="btn btn-circle">❮</a>
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
              </div>
              </div>
          </div>

          {/* Lado derecho: Texto */}
          <div className="md:w-1/2 text-right">
            <h2 className="text-4xl font-bold text-white">¿Qué es la repetición espaciada?</h2>
            <p className="mt-4 text-xl text-white max-w-md ml-auto text-right">
              SharkNow hace uso de un método de aprendizaje llamado "Repetición espaciada", el cual tiene como objetivo 
              la memorización mediante la repetición del contenido a estudiar, esto separado en espacios de tiempo determinados, 
              los cuales van aumentando periódicamente dependiendo de la retención que obtenga el estudiante.
            
            </p>
          </div>

        </div>
      </section>


      {/* Sección: Sistema de Recompensas */}
      <section className="text-center py-19 px-6">
        <h2 className="text-5xl font-bold text-white">Aprende y Gana</h2>
        <p className="mt-5 text-2xl text-gray-200 max-w-3xl mx-auto">
          Obtén recompensas para personalizar tu avatar mientras aprendes con SharkNow y
          presúmeselo a todos. 
        </p>
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-15">
          {/* Recompensa 1 */}
          <div className="card w-90 h-115 bg-white shadow-lg mx-auto p-4 rounded-lg">
            <img src="/src/assets/reward1.png" alt="Recompensa 1" className="rounded-lg" />
            <h3 className="text-xl font-bold mt-4 text-blue-600">Sombreros</h3>
            <p className="text-gray-700">Realiza tus sesiones de estudio y personaliza tu avatar con sombreros.</p>
            
          </div>

          {/* Recompensa 2 */}
          <div className="card w-90 h-115 bg-white shadow-lg mx-auto p-4 rounded-lg">
            <img src="/src/assets/reward2.png" alt="Recompensa 2" className="rounded-lg" />
            <h3 className="text-xl font-bold mt-4 text-blue-600">Insignias</h3>
            <p className="text-gray-700">
              Contribuye a la comunidad creando guías de estudio y obtén insignias.
            </p>
          </div>

          {/* Recompensa 3 */}
          <div className="card w-90 h-115 bg-white shadow-lg mx-auto p-4 rounded-lg">
            <img src="/src/assets/reward3.png" alt="Recompensa 3" className="rounded-lg" />
            <h3 className="text-xl font-bold mt-4 text-blue-600">Marcos</h3>
            <p className="text-gray-700">Mantén una racha de sesiones de estudio y desbloquea marcos.</p>
          </div>
        </div>
      </section>
    </div>
  );
}