import React from 'react'
import Header from '../../common/Header'
import { Redirect } from 'react-router-dom'

class UpdateSurveyPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            redirect: false
        }

        this.deleteSurveyHandler = this.deleteSurveyHandler.bind(this);
        this.addQuestionHandler = this.addQuestionHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.addAnswerHandler = this.addAnswerHandler.bind(this);
        this.changeAnswerHandler = this.changeAnswerHandler.bind(this);
        this.deleteAnswerHandler = this.deleteAnswerHandler.bind(this);
    }

    deleteSurveyHandler(){
        fetch(`http://localhost:8080/surveys/${this.props.match.params.id}`, {
            method: "DELETE",
            headers: {
                'accept': 'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                this.setState({redirect: true});
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    deleteQuestionHandler(id) {
        fetch(`http://localhost:8080/questions/${id}`, {
            method: "DELETE",
            headers: {
                'accept': 'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                console.log("deleting");
                this.componentDidMount();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    componentDidMount() {
        //Fetch survey to create
        fetch(`http://localhost:8080/surveys/${this.props.match.params.id}`, {
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
            console.log(this.state);
        })
        .catch(err => {
            console.log(err);
        })
    }

    changeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        let newQuestion = {...this.state.newQuestion};
        newQuestion[name] = value;
        this.setState({
            newQuestion: newQuestion
        })
    }

    addQuestionHandler() {
        fetch(`http://localhost:8080/questions/survey/${this.props.match.params.id}`, {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(this.state.newQuestion)
        })
            .then(resp => {
                if (resp.ok)
                    return resp.json();
                console.log("error status code: ", resp.status, resp);
            }) 
            .then(json => {
                if (json !== undefined)
                    this.setState({
                        survey: {
                            questions: [...this.state.survey.questions, json]
                        },
                    });
                    this.componentDidMount();
            })
            .catch(er => {
                console.log("Error: ", er);
            });
        }
        
        changeAnswerHandler(event) {
            let name = event.target.name;
            let value = event.target.value;
            let newAnswer = {...this.state.newAnswer};
            newAnswer[name] = value;

            this.setState({
                newAnswer: newAnswer
            })
        }

        addAnswerHandler(id) {
            console.log("adding");
            fetch(`http://localhost:8080/answers/question/${id}`, {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(this.state.newAnswer)
        })
            .then(resp => {
                if (resp.ok)
                    return resp.json();
                console.log("error status code: ", resp.status, resp);
            }) 
            .then(json => {
                if (json !== undefined)
                    console.log(this.state);
                    this.setState({
                            answers: {...this.state.answers, json}
                    });
                    this.componentDidMount();
            })
            .catch(er => {
                console.log("Error: ", er);
            });
        }

        deleteAnswerHandler(id) {
            fetch(`http://localhost:8080/answers/${id}`, {
            method: "DELETE",
            headers: {
                'accept': 'application/json'
            }
            })
            .then(res => {
                if(res.ok) {
                    console.log("deleting");
                    this.componentDidMount();
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
       

    render() {

        if(this.state.redirect) return <Redirect push to="/" />
        
        return (
            <div>
                <Header />
                {
                    //some sweet sweet conditional chaining
                    (this.state.loading) ? <div>Fetching survey...</div> : (
                        (!this.state.survey) ? null : (
                            <div>
                                <h1>{this.state.survey.name}</h1>
                                <ul>
                                    {   
                                        this.state.survey.questions.map(question => {
                                            return (
                                                <li key={question.id}>
                                                    <label>{question.question}</label> 
                                                    <button onClick={() => this.deleteQuestionHandler(question.id)}>Remove this question</button>
                                                    <br />
                                                    {
                                                        (!question.answers ? null :
                                                            question.answers.map(answer => {
                                                                return(
                                                                    <div key={answer.id}>
                                                                        <label>---{answer.answer}</label>
                                                                        <button onClick={() => this.deleteAnswerHandler(answer.id)}>Delete this option</button>
                                                                    </div>
                                                                )
                                                            })
                                                        )
                                                    }
                                                    <input name={"answer"} onChange={this.changeAnswerHandler}/>
                                                    <button onClick={() => this.addAnswerHandler(question.id)}>Add an option to this question</button>    
                                                     
                                                </li> 
                                                )
                                        })
                                    }
                                </ul>
                                <input name={"question"} onChange={this.changeHandler}/>
                                <button onClick={this.addQuestionHandler}>Add question to the survey</button>
                                <br />
                                <br />
                                <button onClick={this.deleteSurveyHandler}>Remove this survey</button>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default UpdateSurveyPage;