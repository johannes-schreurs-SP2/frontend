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
        this.abortController = new AbortController();
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
        .then(res => res.json())
        .then(json  => {
            console.log(json)
            window.localStorage.setItem("authToken", json.authToken);
            window.localStorage.setItem("userId", json.userId);
            this.setState({loggedIn: true})
            this.props.loginHandler();
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
            <div>
                <h2>Login page</h2>
                <label>Email</label>
                <input type="text" name="email" placeholder="email" onChange={this.onChange}></input>
                <br />
                <label>Password</label>
                <input type="password" name="password" placeholder="password" onChange={this.onChange}></input>
                <br />
                <input type="submit" value="login" onClick={this.login}></input>
            </div>
        )
    }
}

export default Login;