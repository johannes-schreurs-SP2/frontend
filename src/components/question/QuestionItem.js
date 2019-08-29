import React from 'react';
import AnswerItem from '../answer/AnswerItem'

const QuestionItem = ({question}) => {

    return (
        <li>
            <p>{question.question}</p>
            {
                question.answers.map(answer => {
                    return <AnswerItem key={answer.id} answer={answer}/>
                })
            }
        </li>
    )
}

export default QuestionItem;