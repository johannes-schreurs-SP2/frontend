import React from 'react';

const SurveyItem = ({survey}) => {
    return(
        <h3>{survey.name} {survey.dateCreated}</h3>
    )
}

export default SurveyItem;