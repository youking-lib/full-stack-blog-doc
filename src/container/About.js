import React from 'react'
import { connect } from 'dva'

import AboutComponent from 'components/About'

const About = () => {
    return (
        <AboutComponent />
    )
}

// About.PropTypes = {}

export default connect()(About)