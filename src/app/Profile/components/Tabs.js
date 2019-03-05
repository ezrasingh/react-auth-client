import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Tabs = ({ items }) => {
    return(
        <ul>
            {items.map((item) => (
                <li key={item.href}>
                    <NavLink
                        activeClassName="is-active"
                        to={item.href}
                        children={item.name}
                        {...item}
                    />
                </li>
            ))}
        </ul>
    )
}

Tabs.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        exact: PropTypes.bool
    }))
}

export default Tabs