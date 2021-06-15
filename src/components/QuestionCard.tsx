import React from 'react';
import PropTypes from 'prop-types';

// Types
import { AnswerObject } from '../App'; 

// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';


type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question, 
  answers, 
  callback, 
  userAnswer, 
  questionNumber, 
  totalQuestions
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{__html: question}} />
      <div>

        {answers.map((answer, index) => (
          <ButtonWrapper
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            key={index}>
            {/* converting userAnswer to boolean using !! equivalent is userAnswer ? true : false */}
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}

      </div>
    </Wrapper>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  questionNumber: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
}

export default QuestionCard;
