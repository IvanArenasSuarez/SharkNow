export default function Home() {
    return (
      <div className="p-6 space-y-12">
        {/* ¿Qué es Sharknow? */}
        <section className="text-center">
          <h1 className="text-4xl font-bold">¿Qué es SharkNow?</h1>
          <p className="mt-4 text-lg text-gray-300">
            Sharknow es un sistema web para el autoestudio basado en la repetición espaciada el cual busca ser una 
            herramienta de apoyo para la comunidad estudiantil de ESCOM mediante las guías de estudio creadas 
            por estudiantes y profesores.
          </p>
  
          {/* Carrusel de imágenes */}
          <div className="carousel w-full max-w-2xl mx-auto mt-6 rounded-lg shadow-lg">
            <div id="slide1" className="carousel-item relative w-full">
              <img src="/img/sharknow1.jpg" className="w-full" alt="Slide 1" />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img src="/img/sharknow2.png" className="w-full" alt="Slide 2" />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img src="/img/sharknow3.png" className="w-full" alt="Slide 3" />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
              </div>
            </div>
           </div>
        </section>
  
        {/* Sistema de Recompensas */}
        <section className="text-center">
          <h2 className="text-3xl font-bold">Sistema de Recompensas</h2>
          <p className="mt-4 text-lg text-gray-300">
            Sharknow te premia por aprender. Hay 3 tipos de recompensas que puedes ganar.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            
            <div className="card w-80 bg-base-100 shadow-md mx-auto">
              <figure>
                <img src="/img/reward1.jpg" alt="Recompensa 1" />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-semibold">Insignias</h3>
                <p > Se otorga por contribuir a la comunidad 
                    a través de crear guías de estudio.</p>
              </div>
            </div>
  
            
            <div className="card w-80 bg-base-100 shadow-md mx-auto">
              <figure>
                <img src="/img/reward2.jpg" alt="Recompensa 2" />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-semibold">Sombreros</h3>
                <p>Se obtiene por realizar cierto número de sesiones de estudio.</p>
              </div>
            </div>
  
            
            <div className="card w-80 bg-base-100 shadow-md mx-auto">
              <figure>
                <img src="/img/reward3.jpg" alt="Recompensa 3" />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-semibold">Marcos</h3>
                <p>Se reciben aleatoriamente junto con los sombreros</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  