import React, { Component } from 'react';
import SurveyItem from '../survey/SurveyItem';
import { Link, Redirect } from 'react-router-dom';
import Logout from '../login/Logout';
import Login from '../login/Login';

class Home extends Component {


    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            loading: true,
            deleting: false,
            loggedIn: false
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    componentDidMount = () => {
        //Fetch surveys
        this.isLoggedIn();
        if(this.state.loggedIn) {
            fetch("http://localhost:8080/surveys/user/" + window.localStorage.getItem('userId'), {
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
    }

    isLoggedIn = () => {
        const authToken = window.localStorage.getItem("authToken");
        if (authToken !== null
            && authToken !== "") {
            this.setState({loggedIn: true});
        } else {
            this.setState({loggedIn: false});
        }
    };

    loginChangeHandler = () => {
        this.isLoggedIn();
        this.componentDidMount();
    };

    logoutHandler = () => {
        this.isLoggedIn();
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
        fetch("http://localhost:8080/surveys/user/" + window.localStorage.getItem('userId'), {
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

        deleteHandler (id) {
            this.setState({deleting : true})

            fetch(`http://localhost:8080/surveys/${id}`, {
            method: "DELETE",
            headers: {
                'accept': 'application/json'
            }
        })
        .then(res => {
            if(res.ok) {
                this.componentDidMount();
                this.setState({deleting : false})
            }
        })
        .catch(err => {
            console.log(err);
        })
        }

    render() {

        if(this.state.redirect) {
            return (
                <Redirect push to={"/update/" + this.state.surveys[this.state.surveys.length - 1].id}/>
            )
        }

        if(!this.state.loggedIn) {
            return(
                <Login loginHandler={this.loginChangeHandler}/>
            )
        }

        return(
                <div>
                    <Logout logoutHandler={this.logoutHandler}/>
                    <h2>Your surveys:</h2>
                    {
                    (this.state.loading) ? <div>Fetching surveys...</div> : (
                            (!this.state.surveys) ? <div>No surveys created yet!</div> : this.state.surveys.map(survey => {
                                return (
                                    <div key={survey.id}>
                                        <Link to={"/survey/" + survey.id}>
                                            <SurveyItem survey={survey}/>
                                        </Link>
                                        <Link to={"/update/" + survey.id}>
                                        ----Update survey
                                        </Link>
                                        <button onClick={() => this.deleteHandler(survey.id)}>Remove this survey</button>
                                        <br/>
                                        <br/>
                                        <br/>
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