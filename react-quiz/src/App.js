import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";

export default function App() {
  const {state, dispatch} = useReducer(reducer, {})

  useEffect(function () {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/questions`);
      const data = await res.json();
      console.log("data: ", data);
    }
    fetchData()
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main className='main'>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
