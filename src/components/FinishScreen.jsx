function FinishScreen({ points, maxPoints, highScore }) {
  const percent = (points / maxPoints) * 100;

  return (
    <>
      <p className='result'>
        You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percent)})%
      </p>
      <p className="highscore">
        Your highest score: {highScore} points
      </p>
    </>
  );
}

export default FinishScreen;
