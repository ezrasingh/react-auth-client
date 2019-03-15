import React from 'react'
import RegistrationFormContainer from './containers/RegistrationFormContainer'

const Register = () => {
    return(
        <section id="register" className="view">
            <div className="container animated fadeIn">
                <RegistrationFormContainer/>
            </div>
        </section>
    )
}

export default Register