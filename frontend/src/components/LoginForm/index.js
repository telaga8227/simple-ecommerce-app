import { Component } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'

import './index.css'


class LoginForm extends Component {
    state = {
        username: '', password: '', showSubmitError: false, errorMsg: '', isLoggedIn: false
    }

    onChangeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitSuccess = (jwtToken, name) => {
        this.setState({ isLoggedIn: true, showSubmitError: false })

        //const { history } = this.props
        

        Cookies.set('jwt_token', jwtToken, {
            expires: 30,
            path: '/',
        })
        //history.push('/')
        setTimeout(()=>{
            window.location.replace('/')
        },1000)

        Cookies.set('user_name', name, {
            expires:30,
            path: '/',
        })

    }

    onSubmitFailure = (errorMsg) => {
        console.log(errorMsg)
        this.setState({ showSubmitError: true, errorMsg })
    }



    submitForm = async event => {
        event.preventDefault()
        const { username, password } = this.state
        const userDetails = { username, password }
        const url = "http://localhost:5001/api/user/login"
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
            //console.log(data)
            console.log(response)
            console.log("server response Data:", data)
            if (response.ok === true) {
                this.onSubmitSuccess(data.jwt_token, data.name)
            }
            else {
                this.onSubmitFailure(data.error_msg)
            }
        } catch (error) {
            console.error("Network Error:", error)
            this.onSubmitFailure("server is unreachable. please check your connection")

        }
    }

    renderUsernameField = () => {
        const { username } = this.state
        return (
            <>
                <label className="input-lable" htmlFor="username" > USERNAME </label>
                <input type="text" id="username" className="input-field" value={username} onChange={this.onChangeUsername} />
            </>
        )
    }

    renderPasswordField = () => {
        const { password } = this.state

        return (
            <>
                <label className="input-lable" htmlFor="password" > PASSWORD </label>
                <input type='password' id="password" className="input-field" value={password} onChange={this.onChangePassword} />

            </>
        )
    }

    render() {
        const { showSubmitError, errorMsg, isLoggedIn } = this.state
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken !== undefined && !isLoggedIn) {
            return <Redirect to="/" />
        }
        return (
            <div className="login-form-container">
                <form className="form-container" onSubmit={this.submitForm}>
                    <div className="input-container"> {this.renderUsernameField()}</div>
                    <div className="input-container"> {this.renderPasswordField()}</div>
                    <button type="submit" className="login-button"> Login </button>                      
                        <span className="signup"> New User ?{''}
                            <a href = '/signup 'className='register'> Register Here </a>
                        </span>                  
                    {showSubmitError && <p className="error-msg"> *{errorMsg} </p>}
                    {isLoggedIn && <p className="success-msg" >login success</p>}
                </form>
            </div>
        )

    }
}
export default LoginForm

//<span > <Link to = '/signup' className="register" > Register Here </Link> </span> 

