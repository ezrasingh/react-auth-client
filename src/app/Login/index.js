import React from 'react'
import LoginFormContainer from './containers/LoginFormContainer'

const Login = () => {
    return(
        <section id="login" className="view">
            <div className="container animated fadeIn">
                <LoginFormContainer/>
            </div>
        </section>
    )
}

export default Login