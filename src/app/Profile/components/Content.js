import React from 'react'

const Content = () => {
    return(
        <section className="content">
            <figure className="is-256">
                <img className="h-center" src={process.env.REACT_APP_MISSING_CONTENT_IMG} alt=""/>
                <figcaption>More features coming soon!</figcaption>
            </figure>
        </section>
    )
}

export default Content