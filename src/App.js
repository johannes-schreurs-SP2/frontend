import React, { useEffect, useState } from 'react';

function App() {

  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch('http://localhost:8080/surveys')
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        console.log(json)
        if (json) {
          setSurveys(json)
        } else {
          setSurveys([])
        }
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading Surveys...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      { 
        surveys &&
        surveys.length > 0 &&
        surveys.map(survey => {
          return(
            <div key={survey.id}>
              <div>Id: {survey.id}, name: {survey.name}, questions: {survey.questions.map(question => <li key={question.id}>{question.question} {question.answers.map(answer => <div key={answer.id}>------{answer.answer}</div>)}</li>)}</div>
              
            </div>
          )
        })
      } 
    </div>
  );
}

export default App;
