import React from 'react';

const SurveyItem = ({survey}) => {
    return(
        <p>{survey.name} {survey.dateCreated}</p>
    )
}

export default SurveyItem;