import React, { Component } from 'react';
import SurveyItem from '../survey/SurveyItem';
import { Link, Redirect } from 'react-router-dom';
import Logout from '../login/Logout';
import Login from '../login/Login';

class Home extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            loading: true,
            deleting: false,
            loggedIn: false,
            otherSurveys: [],

        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    componentDidMount = () => {
        //Fetch surveys
        this._isMounted = true;
        this.isLoggedIn();
            //Your own surveys
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
                if(this._isMounted) this.setState({surveys: json})
            })
            .catch(err => {
                console.log(err);
            })

            //other people their surveys
            fetch("http://localhost:8080/surveys/ordered", {
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
                if(this._isMounted) this.setState({otherSurveys: json})
            })
            .catch(err => {
                console.log(err);
            })   
    }

    componentWillUnmount() {
        this._isMounted = false;
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
                <div className="home__container">
                    <h2>Your surveys:</h2>
                    {
                    (this.state.loading) ? <div>Fetching your surveys...</div> : (
                            (!this.state.surveys) ? <div>No surveys created yet!</div> : this.state.surveys.map(survey => {
                                return (
                                    <div className="home__container-survey" key={survey.id}>
                                        <Link to={"/survey/" + survey.id}>
                                            <SurveyItem survey={survey}/>
                                        </Link>
                                        <Link className="home__container-survey-update" to={"/update/" + survey.id}>
                                        Update this survey.
                                        </Link>
                                        <button className="home__container-survey-delete" onClick={() => this.deleteHandler(survey.id)}>Remove this survey</button>
                                    </div>
                                )
                            })
                    )
                    }
                    <div className="home__container-create">
                        <label className="home__container-label">Survey Name:</label>
                        <input className="home__container-input" name={"name"} onChange={this.changeHandler}/>
                        <button className="home__container-button" onClick={this.submitHandler}>Create Survey</button>
                    </div>

                    <details>
                    <summary style={
                        {
                            fontSize: 30,
                            fontWeight: "bold"
                        }
                    }>See all other surveys</summary>
                    {
                        (this.state.loading) ? <div>Fetching other surveys...</div> : (
                            (!this.state.otherSurveys) ? <div>No surveys created yet!</div> : this.state.otherSurveys.map(survey => {
                                return (
                                    <div key={survey.id}>
                                        <Link to={"/survey/" + survey.id}>
                                            <SurveyItem survey={survey}/>
                                        </Link>
                                    </div>
                                )
                            })
                        )
                    }
                    </details>
                </div>
            </div>
        )
    }
}

export default Home;