import React from 'react'
import PropTypes from 'prop-types'
import CompleteConfirmation from './containers/CompleteConfirmation'
import ResendConfirmation from './containers/ResendConfirmation'

const ConfirmAccount = ({ match }) => {
    const { token } = match.params
    return(
        <section className="view" id="confirmation">
            <div className="container">
                {token ? <CompleteConfirmation token={token}/> : <ResendConfirmation/>}
            </div>
        </section>
    )
}

ConfirmAccount.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string
        }).isRequired
    }).isRequired
}

export default ConfirmAccount