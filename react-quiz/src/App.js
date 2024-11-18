import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from './Error'
import StartScreen from "./StartScreen";

const initState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading'
}

function reducer(state, action) {
  switch(action.type) {
    case 'dataRecieved':
      return {...state, questions: action.payload , status: 'ready'}
    case 'dataFailed':
      return {...state, status: 'error'}
    default:
      throw new Error('Unknown action!')
  }
}

export default function App() {
  const [{questions, status}, dispatch] = useReducer(reducer, initState)
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
        {status === 'ready' && <StartScreen numQuestions={numQuestions} />}

      </Main>
    </div>
  );
}
