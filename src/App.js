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

  const deleteHandler = (id) => {
    console.log("Deleting item with id: " + id)
  }

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
              <h3>{survey.name}</h3>
              <button>Remove</button>
              <div>questions:</div>
              <ul>
                {survey.questions.map(question => {
                  return (
                    <li key={question.id}>
                      <label>{question.question}</label>
                      <button>Remove</button>
                      {question.answers.map((answer, index) => {
                        return (
                          <div key={answer.id}>
                            <label >- {answer.answer}</label>
                            <button onClick={() => deleteHandler(answer.id)}>Remove</button>
                            <button>Update</button>
                          </div>
                        );
                      })}
                    </li>
                  );
                })}
              </ul>
              <button>Add question</button>
              <hr />
            </div>
          )
        })
      } 
    </div>
  );
}

export default App;
