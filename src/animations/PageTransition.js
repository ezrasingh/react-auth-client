import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const PageTransition = ({ location, onLoad, children }) => {
    if(onLoad){
        onLoad()
    }
    return (
        <TransitionGroup className="page-transition-group">
            <CSSTransition
                key={location.key}
                timeout={{ enter: 300, exit: 300 }}
                classNames="transition"
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    )
}

PageTransition.propTypes = {
    location: PropTypes.object.isRequired,
    onLoad: PropTypes.func,
    children: PropTypes.element.isRequired
}

export default PageTransition