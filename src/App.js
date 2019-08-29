import React, { useEffect, useState } from 'react';

const App = () => {

  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch('http://localhost:8080/surveys', {
      method: "GET",
      headers: {
          'accept': 'application/json',
      }
    })
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

  const deleteHandler = (type, id) => {
    fetch(`http://localhost:8080/${type}/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
          })
          .then(json => {
            console.log("deleted");
          })
          .catch(err => {
            console.log(err)
          })
  }

  const updateHandler = (type, object) => {
    console.log(object.id)
    fetch(`http://localhost:8080/${type}/`, {
      method: 'PUT',
      body: JSON.stringify(object),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(json => {
      console.log('updated')
    })
    .catch(err => {
      console.log(err)
    })
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
                      <button onClick={() => deleteHandler("questions", question.id)}>Remove</button>
                      {question.answers.map((answer) => {
                        return (
                          <div key={answer.id}>
                            <label >- {answer.answer}</label>
                            <button onClick={() => deleteHandler("answers", answer.id)}>Remove</button>
                            <input name="update" id="test"></input>
                            <button onClick={() => updateHandler("answers", {
                              'id': answer.id,
                              'answer': document.getElementById('test').value
                            })}>Update</button>
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
