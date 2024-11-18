import { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from './components/Error'
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null
}

function reducer(state, action) {
  switch(action.type) {
    case 'dataRecieved':
      return {...state, questions: action.payload , status: 'ready'}
    case 'dataFailed':
      return {...state, status: 'error'}
    case 'start':
      return {...state, status: 'active'}
    case 'newAnswer':
      return {...state, answer: action.payload}
    default:
      throw new Error('Unknown action!')
  }
}

export default function App() {
  const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initState)
  const numQuestions = questions.length

  function fetchData() {
    fetch(`http://localhost:8000/questions`)
      .then(res => res.json())
      .then(data => dispatch({type: 'dataRecieved', payload: data}))
      .catch(err => dispatch({type: 'dataFailed', payload: err}))
  }

  useEffect(function () {

    fetchData()
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main className='main'>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && <Question question={questions[index]} dispatch={dispatch} answer={answer} />}
      </Main>
    </div>
  );
}
