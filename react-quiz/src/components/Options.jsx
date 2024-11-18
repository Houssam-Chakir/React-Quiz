function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${answer === index ? "answer" : ""} ${hasAnswered ? (question.correctOption === index ? "correct" : "wrong") : ""}`}
            key={option}
            onClick={(e) => dispatch({ type: "newAnswer", payload: index })}
            disable={hasAnswered}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
