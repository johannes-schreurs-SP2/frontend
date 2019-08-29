import React, { Component} from 'react';
import SurveyItem from '../survey/SurveyItem';
import { Link } from 'react-router-dom';

class Home extends Component {
    state = {
        surveys: [],
        loading: true
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

    render() {

        return(
                <div>
                    <h2>Surveys</h2>
                    {
                    (this.state.loading) ? <div>Fetinch surveys...</div> : (
                            (!this.state.surveys) ? null : this.state.surveys.map(survey => {
                                return (
                                    <Link key={survey.id} to={"/survey/" + survey.id}>
                                        <SurveyItem survey={survey}/>
                                    </Link>
                                )
                            })
                    )
                    }
                    <Link to="/create">Create new survey</Link>
                </div>
        )
    }
}

export default Home;