import React, { useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie } from 'recharts';

const QuestionItem = ({question}) => {
    let questionData = [];
    let [showBar, setShowBar] = useState(true);

    question.answers.forEach((answer, index ) => {
        let test = {};
        test.name = answer.answer;
        test.index = index;
        let i = 0;
        answer.userAnswers.forEach(userAnswer => {
            test.amount = userAnswer.answered ? i += 1 : i+=0
        });
        questionData.push(test);
    })

    const clickHandler = () => {
        setShowBar(!showBar);
    }

    return (
        <div>
            <button onClick={clickHandler}>Show {showBar ? "circle graph" : "bar graph"}</button>
            {
                showBar ? <BarChart width={730} height={250} data={questionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart> : 
                    <PieChart width={730} height={250}>
                        <Pie data={questionData} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
                        <Tooltip />
                    </PieChart>
                }
        </div>
    )
}

export default QuestionItem;


