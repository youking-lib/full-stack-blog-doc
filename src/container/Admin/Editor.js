import React from 'react'
import { connect } from 'dva'

import EditorComponent from 'components/Admin/Editor'

const Editor = () => {
    return (
        <EditorComponent />
    )
}

export default connect()(Editor)