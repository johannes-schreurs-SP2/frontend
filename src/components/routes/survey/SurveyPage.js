import React from 'react';
import SurveyList from '../../survey/SurveyList';

const SurveyPage = (props) => {
    
    
    return(
        <div>
            <SurveyList id={props.match.params.id}/>
        </div>
    )
}

export default SurveyPage;