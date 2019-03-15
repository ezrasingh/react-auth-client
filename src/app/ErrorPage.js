import React from 'react'
import PropTypes from 'prop-types'
import ga from 'react-ga'

const ErrorPage = ({ history }) => {
    // Log error page hits with Google analytics
    ga.event({
        category: 'Error Page Response',
        action: window.location.href,
        label: document.referrer
    })
    return(
        <section id="error" className="view">
            <div className="container">
                <div className="content">
                    <h3>Oops, seems like you got lost!</h3>
                    <p>The page you were looking for doesn't exist</p>
                    <button className="btn" onClick={() => history.goBack()}>
                        Return
                    </button>
                </div>
            </div>
        </section>
    )
}

ErrorPage.propTypes = {
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired
    }).isRequired
}

export default ErrorPage