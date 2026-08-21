import { Component } from 'react'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'

import './index.css'


class RegisterForm extends Component {
    state = {
        username: '', name: '', email: '', password: '', showSubmitError: false, errorMsg: '', isRegistrationSuccess:false
    }

    onChangeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    onChangeName = (event) => {
        this.setState({ name: event.target.value })
    }

    onChangeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitSuccess = jwtToken => {
        this.setState({
            username: '', name: '', email: '', password: '',showSubmitError:false, isRegistrationSuccess:true
        })

        Cookies.set('jwt_token', jwtToken, {
            expires: 30, path: '/'
        })

         setTimeout(() =>{
            const { history } = this.props
        history.replace('/')
            
        },2000)
    }

    onSubmitFailure = (errorMsg) => {
        console.log(errorMsg)
        this.setState({ showSubmitError: true, errorMsg , username: '', name: '', email: '', password: ''})
    }

    submitForm = async event => {
        event.preventDefault()
        const { username, name, email, password } = this.state
        const userDetails = { username, name, email, password }
        const url = "http://localhost:5001/api/user/signup"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data)
            console.log(response)
            console.log("server response Data:", data)
            if (response.ok) {
                this.onSubmitSuccess(data.jwt_token)
            }
            else {
                
                this.onSubmitFailure(data.message || "Registration failed")
            }
        } catch (error) {
            console.error("Network Error:", error)
            this.onSubmitFailure("Some thing went wrong. Please Try again.")//server is unreachable. please check your connection

        }
    }

    renderUsernameField = () => {
        const { username } = this.state
        return (
            <>
                <label className="input-lable" htmlFor="username" > Username </label>
                <input type="text" id="username" className="input-field" value={username} onChange={this.onChangeUsername} />
            </>
        )
    }

    renderNameField = () => {
        const { name } = this.state

        return (
            <>
                <label className="input-lable" htmlFor="name" > Name </label>
                <input type='text' id="name" className="input-field" value={name} onChange={this.onChangeName} />

            </>
        )
    }

    renderEmailField = () => {
        const { email } = this.state

        return (
            <>
                <label className="input-lable" htmlFor="email" > Email</label>
                <input type='text' id="email" className="input-field" value={email} onChange={this.onChangeEmail} />

            </>
        )
    }

    renderPasswordField = () => {
        const { password } = this.state

        return (
            <>
                <label className="input-lable" htmlFor="password" > Password </label>
                <input type='password' id="password" className="input-field" value={password} onChange={this.onChangePassword} />

            </>
        )
    }

    render() {
        const { showSubmitError, errorMsg, isRegistrationSuccess } = this.state

        return (
            <div className="login-form-container">
                <form className="form-container" onSubmit={this.submitForm}>
                    <div className="input-container"> {this.renderUsernameField()}</div>
                    <div className="input-container"> {this.renderNameField()}</div>
                    <div className="input-container"> {this.renderEmailField()}</div>
                    <div className="input-container"> {this.renderPasswordField()}</div>
                    <button type="submit" className="login-button"> Sign Up </button>
                    {showSubmitError && <p className="error-msg"> *{errorMsg}  </p>}
                    {isRegistrationSuccess && <p className="success-msg"> User Registered Successfully </p>}
                </form>
            </div>
        )

    }
}
export default withRouter(RegisterForm)

