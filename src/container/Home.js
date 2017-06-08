import React from 'react'
import { connect } from 'dva'

import HomeComponent from 'components/Home'

const Home = ({}) => {
    return (
        <HomeComponent />
    )
}

// Home.propTypes = {}

export default connect()(Home)