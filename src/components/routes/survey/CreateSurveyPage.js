import React from 'react'

class CreateSurveyPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }


    render() {
        return (
            <div>
                <p>create survey with id: {this.props.match.params.id}</p>
            </div>
        )
    }
}

export default CreateSurveyPage;