import React, { Component} from 'react';
import AnswerItem from '../answer/AnswerItem';
import QuestionItem from '../question/QuestionItem';

class SurveyList extends Component {
    constructor(props){
        super(props);
        this.state = {
            survey: {},
            loading: true,

        };
    }

    componentDidMount = () => {
        //Fetch surveys
        fetch(`http://localhost:8080/surveys/${this.props.id}`, {
            method: "GET",
            headers: {
                'accept': 'application/json',
            }
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                console.log("Error fetching");
            }
        })
        .then(json => {
            this.setState({
                survey: json,
                loading: false
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {


        return(
            <div className="surveylist">
            {
                (this.state.loading) ? <div>Fetching the survey...</div> : (
                    <div>
                        <h1 className="surveylist__title">{this.state.survey.name}</h1>
                        {
                            this.state.survey.questions.map(question => {
                                return(
                                    <div className="surveylist__container" key={question.id}>
                                        <label className="surveylist__question-title">{question.question}</label>
                                        <ul className="surveylist__question-list">
                                        {
                                            question.answers.map(answer => {
                                                return(
                                                    <AnswerItem key={answer.id}  answer={answer}/>
                                                )
                                            })   
                                        }
                                        <QuestionItem question={question}/>
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            </div>
        )
    }
}

export default SurveyList;