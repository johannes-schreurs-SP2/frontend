import React, { Component} from 'react';

class SurveyList extends Component {
    state = {
        survey: {},
        loading: true
    };

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
            <div>
            {
                (this.state.loading) ? <div>Fetching the survey...</div> : (
                    <div>
                        <h1>{this.state.survey.name}</h1>
                        {
                            this.state.survey.questions.map(question => {
                                return(
                                    <div key={question.id}>
                                        <label>{question.question}</label>
                                        <ul>
                                        {
                                            question.answers.map(answer => {
                                                return(
                                                    <li key={answer.id}>{answer.answer}</li>
                                                )
                                            })
                                        }
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