import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';  // Asegúrate de tener los estilos por defecto de react-calendar
// Datos simulados de sesiones de estudio
const sampleData = [
    { fecha: '2025-03-20', aciertos: 80, correctas: 8, incorrectas: 2 },
    { fecha: '2025-03-21', aciertos: 75, correctas: 15, incorrectas: 5 },
    { fecha: '2025-03-22', aciertos: 90, correctas: 18, incorrectas: 2 },
    { fecha: '2025-03-23', aciertos: 85, correctas: 17, incorrectas: 3 },
    { fecha: '2025-03-24', aciertos: 95, correctas: 19, incorrectas: 1 },
];

export default function Estadisticas() {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);

    const [guia, setGuia] = useState(() => {
        const guiaRecibida = localStorage.getItem('estadisticas');
        if(guiaRecibida) {
            return JSON.parse(guiaRecibida);
        }
        return {};
    });


    const navigate = useNavigate();

    useEffect(() => {
        const fetchFechas = async () => {
            try {
                const response = await fetch(`http://localhost:4000/guias/estadisticas?id_gde=${guia.id_gde}&id_usuario=${guia.id_usuario}`);
                const info = await response.json();
                const processedData = info.data.map((item) => ({
                    ...item,
                    fecha: item.fecha.split('T')[0]
                }));

                setData(processedData);
                const totalAciertos = processedData.reduce((sum, item) => sum + item.correctas, 0);
            } catch (error) {
                console.error("Error: " + error);
            }
        }

        fetchFechas();
    }, []);

    useEffect(() => {
        const session = data.find((item) => item.fecha === selectedDate);
        setSelectedSession(session || null);
    }, [selectedDate, data]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-900 text-gray-200 min-h-screen">
            {/* Gráfica */}
            <div className="md:col-span-2 bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-100">Progreso de Aciertos</h2>
                <div className="overflow-x-auto">
                    <ResponsiveContainer width={data.length > 5 ? 800 : "100%"} height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="fecha" stroke="#ccc" />
                            <YAxis domain={[0, 100]} stroke="#ccc" />
                            <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
                            <Line type="monotone" dataKey="correctas" stroke="#6366F1" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <button onClick={() => navigate('/ver-guia-seguida')} className="btn btn-primary my-8 mx-8">Regresar</button>
            </div>

            {/* Calendario */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-100">Sesiones de Estudio</h2>
                <Calendar 
                    onChange={(date) => setSelectedDate(date.toISOString().split('T')[0])} 
                    tileClassName={({ date }) => 
                        data.some(d => d.fecha === date.toISOString().split('T')[0]) 
                        ? "session-day" // Cambiar a clase personalizada para días con sesiones
                        : "text-gray-300"
                    }
                    className="react-calendar bg-gray-900 text-white border-2 border-gray-600 rounded-lg shadow-lg p-3"
                />
                
                {/* Información de la sesión seleccionada */}
                {selectedSession && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-xl">
                        <p className="text-lg font-semibold text-gray-100">Detalles de la Sesión</p>
                        <p className="text-sm text-gray-300">Fecha: {selectedSession.fecha}</p>
                        <p className="text-sm text-green-400">Correctas: {selectedSession.correctas}</p>
                        <p className="text-sm text-red-400">Incorrectas: {(selectedSession.total_reactivos - selectedSession.correctas)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}