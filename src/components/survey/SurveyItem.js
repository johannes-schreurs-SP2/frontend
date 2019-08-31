import React from 'react';

const SurveyItem = ({survey}) => {
    return(
        <div>
            <h3>{survey.name}</h3>
            <p>{survey.dateCreated}</p>
        </div>
    )
}

export default SurveyItem;