import { mockData as data } from "./mocks/data";
import { useState, useEffect } from "react";
import Button from "./components/UI/Button";
import Layout from "./layout/Layout";
import { MAX_TIMER } from "./constants/base";
import Counter from "./components/UI/Counter";

const App = () => {
  const [timer, setTimer] = useState(60 * MAX_TIMER);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [answer, setAnswer] = useState<string>("");
  const [countAnswers, setCountAnswers] = useState<number>(0);

  const handleNextQuestion = () => {
    if (countAnswers === data.length - 1) {
      setSurveyCompleted(true);
      return;
    }
    setCountAnswers((prevCount) => prevCount + 1);
    setIsOptionSelected(false);
  };

  const handleAnswerChange = (option: string) => {
    setAnswer(option);
    setIsOptionSelected(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Limpiar cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      bg-white p-8 rounded-lg shadow-md max-w-xl w-full min-w-[375px]"
      >
        {surveyCompleted ? (
          <div>
            <p className="text-2xl text-center font-bold mb-6 text-blue-900">
              Gracias por responder esta encuesta!
            </p>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
              Retomar Encuesta
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-lg font-bold mb-6 select-none text-blue-800">
              Pregunta {countAnswers + 1} de {data.length}
            </p>
            <h1 className="text-1 text-pretty select-none font-bold mb-6 text-blue-800">
              {data[countAnswers].question}
            </h1>
            {data[countAnswers].answers.map((option, index: number) => (
              <div key={index} className="mt-2 flex items-center gap-2">
                <input
                  type="radio"
                  name="answer"
                  data-theme="light"
                  className="radio radio-sm radio-primary"
                  id={`option-${index}`}
                  value={option}
                  onChange={() => handleAnswerChange(option)}
                  checked={answer === option}
                />
                <label
                  htmlFor={`option-${index}`}
                  className="cursor-pointer select-none font-bold text-blue-800"
                >
                  {option}
                </label>
              </div>
            ))}
            <div className="mt-8 flex gap-x-1 font-semibold text-blue-800">
              <p>Tiempo:</p>
              <Counter
                time={Math.floor(timer / 60).toString()}
                label="minutos"
              />
              <Counter time={timer % 60} label="segundos" />
            </div>
            <Button
              onClick={handleNextQuestion}
              disabled={!isOptionSelected}
              className={`mt-4 ${
                isOptionSelected
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              Siguiente
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
