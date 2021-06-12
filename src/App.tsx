import React, { useState } from "react";
import { fetchQuizQuestions, QuestionState, Difficulty } from './API'
//Components
import QuestionCard from './components/QuestionCard';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState <QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  
  const startTrivia = async () => {
    try {
      setLoading(true);
      setGameOver(false);
  
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);

      console.log(newQuestions);
      
      
    } catch (error) {
      console.log(error);
      
    }
    
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    
  }

  const nextQuestion = () => {
    console.log("here");
    
  }

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: </p> : null }
      {loading && <p>Loading Question ...</p> }

      {!loading && !gameOver && (
        <QuestionCard
          question={questions[number].question}
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
        
      )}
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>

    </div>
  );
}

export default App;
