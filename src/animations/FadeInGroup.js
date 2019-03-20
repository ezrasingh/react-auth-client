import React from 'react'
import PropTypes from 'prop-types'
import Anime from 'react-anime'

let id = 0

const FadeInGroup = ({ children }) => {
    id++
    return(
        <Anime 
            key={id.toString()}
            easing="easeOutElastic" 
            delay={(e, i) => i * 100} 
            opacity={[ 0, 1 ]} 
            translateY={[ '1em', 0 ]}
        >
            {children}
        </Anime>
    )
}

FadeInGroup.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
}

export default FadeInGroup