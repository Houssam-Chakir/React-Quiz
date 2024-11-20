import { useEffect} from "react";

function Timer({ seconds, dispatch }) {
  const mins = Math.floor(seconds / 60)
  const sec = seconds % 60

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return <div className='timer'>{mins < 10 ? '0': ''}{mins}:{sec < 10 ? '0': ''}{sec}</div>;
}

export default Timer;
