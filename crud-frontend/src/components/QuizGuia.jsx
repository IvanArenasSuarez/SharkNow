import { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useParams } from 'react-router-dom';

const ItemType = "ANSWER";

const calculateQuality = (isCorrect, seconds) => {
    console.log(isCorrect,seconds);
    if (seconds >= 60) return 0;
    if (!isCorrect && seconds >= 40) return 1;
    if (!isCorrect && seconds >= 20) return 2;
    if (isCorrect && seconds > 40) return 3;
    if (isCorrect && seconds >= 20) return 4;
    if (isCorrect && seconds < 20) return 5;
    return 0;
};

function DraggableAnswer({ answer, index, assignedColor }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-2 border text-white font-semibold rounded-lg mb-2 ${assignedColor} ${isDragging ? "opacity-50" : ""}`}
        >
            {answer}
        </div>
    );
}

function DroppableArea({ index, acceptAnswer, answer, assignedColor }) {
    const [, drop] = useDrop(() => ({
        accept: ItemType,
        drop: (item) => acceptAnswer(item.index, index),
    }));

    return (
        <div 
            ref={drop} 
            className={`p-2 border rounded-lg mb-2 min-h-[40px] ${assignedColor || "bg-gray-700"} text-white`}
        >
            {answer}
        </div>
    );
}

export default function QuizGuia() {
    const { id_gde } = useParams();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const startTime = new Date();
    const [qualityPerQuestion, setQualityPerQuestion] = useState([]);
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [timer, setTimer] = useState(0);
    const [questionTimes, setQuestionTimes] = useState([]);
    const [questionTime, setQuestionTime] = useState(0);
    const [matchingAnswers, setMatchingAnswers] = useState({});
    const [userMatches, setUserMatches] = useState({});

    const [esPrimeravez,setPrimeraVez]=useState([false]);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [assignedColors, setAssignedColors] = useState({});
    const initialLeftColumnColors = ["bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-green-500"];
    const [allCorrect, setAllCorrect] = useState({});
    const [sessionData, setSessionData] = useState(null);
    const [readyToStart, setReadyToStart] = useState(false);
    const [shuffledRight, setShuffledRight] = useState([]);
    const [meSirve, setMeSirve] = useState(false);

  const toggleMeSirve = async () => {
    try {
      const url = meSirve
        ? 'http://localhost:4000/guias/quitar-mesirve'
        : 'http://localhost:4000/guias/marcar-mesirve';

      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: userData.id_usuario,
          id_gde: guia.id
        })
      });

      if (!res.ok) throw new Error("Error al actualizar MeSirve");
      setMeSirve(!meSirve);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const seguirGuia = async () => {
    
    console.log("siguiendo guia");

  };

 useEffect(() => {
    const obtenerQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:4000/quiz/${id_gde}`, {
          headers: {
                        Authorization: `Bearer ${token}`,
                    },
        });
        if (!res.ok) throw new Error('No se pudo obtener el quiz');
        const data = await res.json();
        setQuestions(data.preguntas);
        setPrimeraVez(data.primeraVez);

      } catch (err) {
        setError(err.message);
      } finally {
      }
    };

    if (id_gde) obtenerQuiz();
  }, [id_gde]);

    useEffect(() => {
    let interval;
    if (readyToStart && !completed) {
        interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        setQuestionTime((prev) => prev + 1);
        }, 1000);}
    return () => clearInterval(interval);
    }, [readyToStart, completed]);

    useEffect(() => {
        console.log("Preguntas asignadas:", questions);
        setLoading(false);
    }, [questions]);

    useEffect(() => {
    if (questions.length === 0 || !questions[step]) return;
    if (questions[step].type === "multipleChoice") {
        const shuffled = [...questions[step].options].sort(() => Math.random() - 0.5);
        setShuffledOptions(shuffled);
    } else if (questions[step].type === "matching") {
      const originalPairs = questions[step].pairs;
      const shuffledRight = originalPairs
      .map((pair, index) => ({ right: pair.right, originalIndex: index }))
      .sort(() => Math.random() - 0.5);
      setShuffledRight(shuffledRight);
    }
    }, [step, questions]);

    useEffect(() => {
    if (
        questions.length === 0 ||
        !questions[step] ||
        questionTime < 60 ||
        showFeedback ||
        completed
    ) return;

    if (questions[step].type === "multipleChoice" || questions[step].type === "trueFalse") {
        handleAnswer(null);
    } else if (questions[step].type === "matching") {
        checkMatchingAnswers();
    }
}, [questionTime, questions, step, showFeedback, completed]);

    useEffect(() => {
        if (completed && sessionData) {
            const enviarSesion = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const res = await fetch('http://localhost:4000/sesion-estudio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                    body: JSON.stringify(sessionData),
                    });

                    if (!res.ok) {
                        throw new Error('Error al enviar la sesión');
                    }

                    const data = await res.json();
                    console.log('Sesión registrada:', data);
                } catch (error) {
                    console.error('Error al registrar la sesión:', error);
                }
            };
            enviarSesion();
        }
    }, [completed, sessionData]);


    const handleAnswer = (selectedOption) => {
        const isCorrect = selectedOption === questions[step].answer;
        const calidad = calculateQuality(isCorrect, questionTime);
        setQuestionTime(0);
        setQualityPerQuestion([...qualityPerQuestion, { id_reactivo: questions[step].id, calidad }]);
    
        if (selectedOption === null) {
            setFeedbackMessage(`Tiempo agotado. La respuesta correcta era: ${questions[step].answer}`);
        } else if (isCorrect) {
            setScore(score + 1);
            setFeedbackMessage("¡Correcto!");
        } else {
            if (questions[step].type === "matching") {
               
            } else {
              setFeedbackMessage(`Incorrecto. La respuesta correcta es: ${questions[step].answer}`);
            }
        }
    
        setShowFeedback(true);
    };

    const handleMatchAnswer = (leftIndex, rightIndex) => {
    const selectedRight = shuffledRight[rightIndex]; // Usar la opción mezclada
    const color = initialLeftColumnColors[leftIndex];

    setAssignedColors((prev) => ({
        ...prev,
        [rightIndex]: color,
    }));

    // Guardar el índice original de la opción derecha con la que se hizo match
    setMatchingAnswers((prev) => ({
        ...prev,
        [leftIndex]: selectedRight.originalIndex,
    }));
};

    
    const checkMatchingAnswers = () => {
        const correctPairs = questions[step].pairs;
        let allCorrectLocal = true;
    
    console.log("📤 Respuestas seleccionadas por el usuario:");
    Object.entries(matchingAnswers).forEach(([leftIndex, selectedRight]) => {
        console.log(`  ${correctPairs[leftIndex].left} → ${selectedRight}`);
    });

    console.log("✅ Respuestas correctas:");
    correctPairs.forEach((pair) => {
        console.log(`  ${pair.left} → ${pair.right}`);
    });

        correctPairs.forEach((pair, leftIndex) => {
            const assignedRightValue = matchingAnswers[leftIndex];
            if (assignedRightValue !== pair.right) {
                allCorrectLocal = false;
            }
        });
    
        const calidad = calculateQuality(allCorrectLocal, questionTime);
        setQuestionTime(0);
        setQualityPerQuestion([...qualityPerQuestion, { id_reactivo: questions[step].id, calidad }]);
    
        setAllCorrect((prev) => ({
            ...prev,
            [step]: allCorrectLocal,
        }));
    
        if (allCorrectLocal) {
            setScore(score + 1);
            setFeedbackMessage("¡Correcto!");
        } else {
            const pairsText = questions[step].pairs
                .map(pair => `${pair.left} → ${pair.right}`)
                .join("\n\n");
            setFeedbackMessage(`Incorrecto. La relacion correcta es: \n\n ${pairsText}`);
        }
    
        setShowFeedback(true);
    };

    const nextStep = () => {
         setAssignedColors({});
         setMatchingAnswers({});
         setQuestionTime(0);
        setShowFeedback(false);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setCompleted(true);
            const endTime = new Date();
            const sessionInfo = {
                id_usuario: 1, 
                id_gde: id_gde,
                hora_inicio: startTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false }),
                hora_fin: endTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false }),
                respuestas: qualityPerQuestion, // Calidad por pregunta
            };
            setSessionData(sessionInfo);
        }
    };

return (
<div className="p-4 w-full max-w-xl h-[450px] mx-auto bg-gray-900 text-white rounded-lg shadow-lg mt-12 overflow-auto flex flex-col justify-center items-center">
    {loading ? (
      <div className="text-center text-lg font-semibold">Cargando preguntas...</div>
    ) : !readyToStart ? (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">¿Listo para comenzar?</h2>
        <p className="mb-4">Esta sesión tiene {questions.length} preguntas.</p>
        <button 
          className="p-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg"
          onClick={() => setReadyToStart(true)}
        >
          Comenzar
        </button>
      </div>
    ) : !completed ? (
      showFeedback ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 whitespace-pre-line text-white">
            {feedbackMessage.startsWith("¡Correcto!") && (
              <span className="text-green-500 font-bold">{feedbackMessage}</span>
            )}
            {feedbackMessage.startsWith("Incorrecto") && (
              <>
                <span className="text-red-500 font-bold">Incorrecto.</span>
                {feedbackMessage.slice("Incorrecto.".length)}
              </>
            )}
            {!feedbackMessage.startsWith("¡Correcto!") && !feedbackMessage.startsWith("Incorrecto") && (
              <>{feedbackMessage}</>
            )}
          </h2>

          <button 
            className="mt-4 p-2 bg-blue-500 text-white font-semibold rounded-lg" 
            onClick={nextStep}
          >
            Siguiente Pregunta
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4 text-yellow-400">
            {questions[step].question}
          </h2>

          {/* Renderizado por tipo */}
          {questions[step].type === "multipleChoice" ? (
            shuffledOptions.map((option, index) => {
              const colors = [
                "bg-blue-500 hover:bg-blue-400",
                "bg-red-500 hover:bg-red-400",
                "bg-yellow-500 hover:bg-yellow-400",
                "bg-green-500 hover:bg-green-400",
              ];
              return (
                <button
                  key={index}
                  className={`block w-full p-2 border mb-2 ${colors[index]} text-white font-semibold rounded-lg`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              );
            })
          ) : questions[step].type === "trueFalse" ? (
            questions[step].options.map((option, index) => {
              const color = option === "Verdadero"
                ? "bg-blue-500 hover:bg-blue-400"
                : "bg-red-500 hover:bg-red-400";
              return (
                <button
                  key={index}
                  className={`block w-full p-2 border mb-2 ${color} text-white font-semibold rounded-lg`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              );
            })
          ) : (
            <div className="flex justify-between">
      {/* Columna izquierda (preguntas): en orden original */}
      <div className="w-1/2 border-r">
        {questions[step].pairs.map((pair, index) => (
          <DraggableAnswer
            key={index}
            answer={pair.left}
            index={index}
            assignedColor={initialLeftColumnColors[index]}
          />
        ))}
      </div>

      {/* Columna derecha (respuestas): mezcladas */}
      <div className="w-1/2">
        {shuffledRight.map((rightValue, index) => (
          <DroppableArea
            key={index}
            index={index}
            acceptAnswer={handleMatchAnswer}
            answer={rightValue.right}
            assignedColor={assignedColors[index]}
          />
        ))}
      </div>
    </div>
          )}

          {questions[step].type === "matching" && (
            <button
              className="mt-4 p-2 bg-green-500 text-white font-semibold rounded-lg"
              onClick={checkMatchingAnswers}
            >
              Completado
            </button>
          )}
        </>
      )
    ) : (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-400">¡Sesión Terminada!</h2>
        <p className="text-lg mt-2">Puntaje: {score} de {questions.length}</p>
        <p className="text-sm text-gray-300 mt-2">Tiempo total: {timer}s</p>
        {esPrimeravez && (
        <div className="flex justify-center gap-12 mt-8">
          <div className="flex flex-col items-center">
            <button className="btn btn-lg flex items-center gap-1 btn-square btn-ghost" onClick={toggleMeSirve}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={meSirve ? "yellow" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke={meSirve ? "yellow" : "currentColor"}
                className="size-10 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </button>
            <span className="mt-2">Me Sirve</span>
          </div>
      
          <div className="flex flex-col items-center">
            <button className="btn btn-lg btn-square btn-ghost" 
            onClick={() => {
              seguirGuia();
              navigate('/home');
            }}>
              <svg className="size-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                  <path d="m4.5 12.75 6 6 9-13.5"></path>
                </g>
              </svg>
            </button>
            <span className="mt-2">Siguiendo</span>
          </div>
        </div>
        )}
      </div>
    )}
  </div>
);

}