import React from 'react';
import SurveyList from '../../survey/SurveyList';
import Header from '../../common/Header'

const SurveyPage = (props) => {
    
    
    return(
        <div>
            <Header />
            <SurveyList id={props.match.params.id}/>
        </div>
    )
}

export default SurveyPage;