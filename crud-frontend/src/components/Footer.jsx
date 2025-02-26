export default function Footer() {
    return (
      <footer className="bg-base-200 text-center p-6 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          <div>
            <h2 className="text-2xl font-bold">SharkNow</h2>
            <p className="text-gray-400">Agosto 2024- Junio 2025</p>
          </div>
  
          <div>
            <h3 className="text-lg font-semibold">Equipo de Desarrollo</h3>
            <ul className="text-gray-400">
              <li>Arenas Suárez Iván - <a href="mailto:iarenass1600@alumno.ipn.mx" className="text-blue-500 hover:underline">iarenass1600@alumno.ipn.mx</a></li>
              <li>Carbajal Arredondo Salvador - <a href="mailto:sarredondoc1300@alumno.ipn.mx" className="text-blue-500 hover:underline">sarredondoc1300@alumno.ipn.mx</a></li>
              <li>García Moguel Yael - <a href="mailto:ygarciam1902@alumno.ipn.mx" className="text-blue-500 hover:underline">ygarciam1902@alumno.ipn.mx</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-lg font-semibold">Directora del Proyecto</h3>
            <p className="text-gray-400">M. en C. Sandra Ivette Bautista Rosales</p>
          </div>
  
        </div>
      </footer>
    );
  }
  