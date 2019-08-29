import React, { Component } from 'react';
import SurveyItem from '../survey/SurveyItem';
import { Link, Redirect } from 'react-router-dom';

class Home extends Component {


    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount = () => {
        //Fetch surveys
        fetch("http://localhost:8080/surveys", {
            method: "GET",
            headers: {
                'accept': 'application/json',
            }
        })
        .then(res => {
            if(res.ok) {
                this.setState({loading: false});
                return res.json();
            } else {
                console.log("Error fetching");
            }
        })
        .then(json => {
            this.setState({surveys: json})
        })
        .catch(err => {
            console.log(err);
        })
    }

    changeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        let newSurvey = {...this.state.survey};
        newSurvey[name] = value;
        this.setState({
            newSurvey: newSurvey
        })
    }

    submitHandler() {
        fetch("http://localhost:8080/surveys/user/1", {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(this.state.newSurvey)
        })
            .then(resp => {
                if (resp.ok)
                    return resp.json();
                console.log("error status code: ", resp.status, resp);
            }) 
            .then(json => {
                if (json !== undefined)
                    this.setState({
                        surveys: [...this.state.surveys, json],
                        redirect: true
                    });
            })
            .catch(er => {
                console.log("Error: ", er);
            });
        }

    render() {

        if(this.state.redirect) {
            return (
                <Redirect push to={"/create/" + this.state.surveys[this.state.surveys.length - 1].id}/>
            )
        }

        return(
                <div>
                    <h2>Surveys</h2>
                    {
                    (this.state.loading) ? <div>Fetching surveys...</div> : (
                            (!this.state.surveys) ? null : this.state.surveys.map(survey => {
                                return (
                                    <div key={survey.id}>
                                        <Link to={"/survey/" + survey.id}>
                                            <SurveyItem survey={survey}/>
                                        </Link>
                                        <Link to={"/update/" + survey.id}>
                                        ----Update survey
                                        </Link>
                                    </div>
                                )
                            })
                    )
                    }
                    <label>Survey Name:</label>
                    <input name={"name"} onChange={this.changeHandler}/>
                    <button onClick={this.submitHandler}>Create Survey</button>
                </div>
        )
    }
}

export default Home;