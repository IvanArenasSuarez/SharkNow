import { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "ANSWER";

const calculateQuality = (isCorrect, seconds) => {
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
    const startTime = new Date();
    const [qualityPerQuestion, setQualityPerQuestion] = useState([]);
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [timer, setTimer] = useState(0);
    const [questionTimes, setQuestionTimes] = useState([]);
    const [questionTime, setQuestionTime] = useState(0);
    const [matchingAnswers, setMatchingAnswers] = useState({});
    const [shuffledPairs, setShuffledPairs] = useState([]);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [assignedColors, setAssignedColors] = useState({});
    const initialLeftColumnColors = ["bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-green-500"];
    const [allCorrect, setAllCorrect] = useState({});
    const [sessionData, setSessionData] = useState(null);

    const questions = [
        {
            id: 8,
            type: "multipleChoice",
            question: "¿Cuál es la opcion correcta?",
            options: ["Esta no", "Esta tampoco", "Esta si", "Esta menos"],
            answer: "Esta si",
        },
        {
            id: 40,
            type: "trueFalse",
            question: "Esta es verdadera",
            options: ["Verdadero", "Falso"],
            answer: "Verdadero",
        },
        {
            id: 3,
            type: "matching",
            question: "Relaciona las columnas:",
            pairs: [
                { left: "Arriba", right: "W" },
                { left: "Abajo", right: "S" },
                { left: "Derecha", right: "D" },
                { left: "Izquierda", right: "A" }
            ],
        }
    ];

    useEffect(() => {
        if (!completed) {
            const interval = setInterval(() => {
                setTimer((prev) => prev + 1);
                setQuestionTime((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [completed]);

    useEffect(() => {
        if (questions[step].type === "multipleChoice") {
            const shuffled = [...questions[step].options].sort(() => Math.random() - 0.5);
            setShuffledOptions(shuffled);
        } else if (questions[step].type === "matching") {
            const shuffled = [...questions[step].pairs].sort(() => Math.random() - 0.5);
            setShuffledPairs(shuffled);
        }
    }, [step]);

    useEffect(() => {
        if (questionTime >= 60 && !showFeedback && !completed) {
            if (questions[step].type === "multipleChoice" || questions[step].type === "trueFalse") {
                handleAnswer(null); // null para forzar incorrecto
            } else if (questions[step].type === "matching") {
                checkMatchingAnswers();
            }
        }
    }, [questionTime]);
    

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
            setFeedbackMessage(`Incorrecto. La respuesta correcta es: ${questions[step].answer}`);
        }
    
        setShowFeedback(true);
    };
    

    const handleMatchAnswer = (leftIndex, rightIndex) => {
        const pair = questions[step].pairs[leftIndex];
        
        const color = initialLeftColumnColors[leftIndex];
        
        setAssignedColors((prev) => ({
            ...prev,
            [rightIndex]: color,
        }));
    
        setMatchingAnswers((prev) => ({
            ...prev,
            [leftIndex]: pair.right,
        }));
    };
    
    const checkMatchingAnswers = () => {
        const correctPairs = questions[step].pairs;
        let allCorrectLocal = true;
    
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
            setFeedbackMessage("Incorrecto. Aquí está la relación correcta:");
        }
    
        setShowFeedback(true);
    };

    const nextStep = () => {
        setShowFeedback(false);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setCompleted(true);
            const endTime = new Date();
            const sessionInfo = {
                id_usuario: 1, 
                id_gde: 1,
                hora_inicio: startTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false }),
                hora_fin: endTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false }),
                respuestas: qualityPerQuestion, // Calidad por pregunta
            };
            setSessionData(sessionInfo);
            console.log(JSON.stringify(sessionInfo, null, 2));
        }
    };
    
    return (
        <div className="p-4 max-w-lg mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
            {!completed ? (
                showFeedback ? (
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">{feedbackMessage}</h2>
                        <button 
                            className="mt-4 p-2 bg-blue-500 text-white font-semibold rounded-lg" 
                            onClick={nextStep}
                        >
                            Siguiente Pregunta
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-yellow-400">{questions[step].question}</h2>
                        {questions[step].type === "multipleChoice" ? (
                            shuffledOptions.map((option, index) => {
                                let buttonClass = "";
    
                                if (index === 0) {
                                    buttonClass = "bg-blue-500 hover:bg-blue-400";
                                } else if (index === 1) {
                                    buttonClass = "bg-red-500 hover:bg-red-400";
                                } else if (index === 2) {
                                    buttonClass = "bg-yellow-500 hover:bg-yellow-400";
                                } else {
                                    buttonClass = "bg-green-500 hover:bg-green-400";
                                }
    
                                return (
                                    <button
                                        key={index}
                                        className={`block w-full p-2 border mb-2 ${buttonClass} text-white font-semibold rounded-lg`}
                                        onClick={() => handleAnswer(option)}
                                    >
                                        {option}
                                    </button>
                                );
                            })
                        ) : questions[step].type === "trueFalse" ? (
                            questions[step].options.map((option, index) => {
                                let buttonClass = "";
    
                                if (option === "Verdadero") {
                                    buttonClass = "bg-blue-500 hover:bg-blue-400";
                                } else if (option === "Falso") {
                                    buttonClass = "bg-red-500 hover:bg-red-400";
                                }
    
                                return (
                                    <button
                                        key={index}
                                        className={`block w-full p-2 border mb-2 ${buttonClass} text-white font-semibold rounded-lg`}
                                        onClick={() => handleAnswer(option)}
                                    >
                                        {option}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="flex justify-between">
                                <div className="w-1/2 border-r">
                                    {shuffledPairs.length > 0 && shuffledPairs.map((pair, index) => (
                                        <DraggableAnswer
                                            key={index}
                                            answer={pair.left}
                                            index={index}
                                            assignedColor={initialLeftColumnColors[index]} 
                                        />
                                    ))}
                                </div>
    
                                <div className="w-1/2">
                                    {questions[step].pairs.length > 0 &&
                                        questions[step].pairs.map((pair, index) => (
                                            <DroppableArea
                                                key={index}
                                                index={index}
                                                acceptAnswer={handleMatchAnswer}
                                                answer={pair.right}
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
                </div>
            )}
        </div>
    );
}