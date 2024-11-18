import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log("state: ", state);
  // if(type === 'inc') return currentState + 1
  // if(type === 'dec') return currentState - 1
  // if(type === 'set') return payload

  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "set":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return action.payload;
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const initState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initState);
  const { count, step } = state;
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "inc" });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: "set", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset", payload: initState });
  };

  return (
    <div className='counter'>
      <div>
        <input type='range' min='0' max='10' value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
