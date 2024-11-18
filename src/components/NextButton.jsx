function NextButton({ dispatch, answer, isFinished }) {

  return (
    <div>
      {answer >= 0 && (
        <button className='btn btn-ui' onClick={() => dispatch({ type: isFinished ? "endQuiz" : "nextQuestion" })}>
          {isFinished ? 'Done' : 'Next'}
        </button>
      )}
    </div>
  );
}

export default NextButton;
