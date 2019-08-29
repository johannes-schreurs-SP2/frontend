import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const UpdateSurveyPage = (props) => {

    let [redirect, setRedirect] = useState(false);

    const deleteHandler = () => {
        fetch(`http://localhost:8080/surveys/${props.match.params.id}`, {
            method: "DELETE",
            headers: {
                'accept': 'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                setRedirect(true);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    if(redirect) {
        return <Redirect push to="/" />
    } else {
        return (
            <div>
                <p>Updating page with id: {props.match.params.id}</p>
                <button onClick={deleteHandler}>Remove this survey</button>
            </div>
        )
    }
}

export default UpdateSurveyPage;