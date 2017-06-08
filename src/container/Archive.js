import React from 'react'
import { connect } from 'dva'

import ArchiveComponent from 'components/Archive'

const Archive = () => {
    return (
        <ArchiveComponent />
    )
}

export default connect()(Archive)