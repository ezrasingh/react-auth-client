import React from 'react'
import PropTypes from 'prop-types'
import ConfirmRecovery from './containers/ConfirmRecovery'
import SendRecovery from './containers/SendRecovery'

const RecoverAccount = ({ match }) => {
    const { token } = match.params
    return(
        <section className="view" id="recovery">
            <div className="container animated fadeIn">
                {token ? <ConfirmRecovery token={token}/> : <SendRecovery/>}
            </div>
        </section>
    )
}

RecoverAccount.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string
        }).isRequired
    }).isRequired
}

export default RecoverAccount