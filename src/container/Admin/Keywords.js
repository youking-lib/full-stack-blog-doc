import React from 'react'
import { connect } from 'dva'

import KeywrodsComponent from 'components/Admin/Keywords'

const Keywrods = () => {
    return (
        <KeywrodsComponent />
    )
}

export default connect()(Keywrods)