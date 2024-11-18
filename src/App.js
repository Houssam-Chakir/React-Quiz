import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

const initState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  answered: false,
  points: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const updatedPoints = question.correctOption === action.payload ? state.points + question.points : state.points

      return { ...state,
        answer: action.payload,
        points: state.answered ? state.points : updatedPoints,
        answered: true
       };
    case "nextQuestion":

      return { ...state, index: state.index + 1, answer: null, answered: false };
    case 'endQuiz':
      return {...state, status: 'finished', highScore: state.points > state.highScore ? state.points : state.highScore}
    default:
      throw new Error("Unknown action!");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] = useReducer(reducer, initState);
  const numQuestions = questions.length;
  const maxPoints = questions?.reduce(function (acc, curr) {
    return acc + curr.points;
  }, 0);
  const isFinished = index === numQuestions - 1
  console.log('isFinished: ', isFinished);

  function fetchData() {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }

  useEffect(function () {
    fetchData();
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main className='main'>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} isFinished={isFinished} points={points} />
          </>
        )}
        {status === "finished" && <FinishScreen points={points} maxPoints={maxPoints} highScore={highScore} />}
      </Main>
    </div>
  );
}
