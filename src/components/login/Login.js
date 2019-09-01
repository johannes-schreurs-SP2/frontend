import React from 'react'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loggedIn: false
        }

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    login() {
        fetch("http://localhost:8080/login", {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.ok) return res.json()
            else if(res.status === 500){
                this.setState({
                    error: true,
                    errorMessage: "Wrong email or password"
                })
            }
        })
        .then(json  => {
            if(json !== undefined) {
                console.log(json)
                window.localStorage.setItem("authToken", json.authToken);
                window.localStorage.setItem("userId", json.userId);
                this.setState({loggedIn: true})
                this.props.loginHandler();
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        return(
            <div className="login">
                <h1 className="login__intro">Survey app</h1>
                <div className="login_container">
                    <h2 className="login__header">Login page</h2>
                    <div className="login__input-container">
                        <input className="login__input-container-input" type="text" name="email" placeholder="email" onChange={this.onChange}></input>
                    </div>
                    <div className="login__input-container">
                        <input className="login__input-container-input login__input-container-input--nbt" type="password" name="password" placeholder="password" onChange={this.onChange}></input>
                    </div>
                    <input className="login__button" type="submit" value="Login" onClick={this.login}></input>
                    {this.state.error ? <p class="login__error">{this.state.errorMessage}</p> : null}
                </div>
            </div>
        )
    }
}

export default Login;