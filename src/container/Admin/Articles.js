import React from 'react'
import { connect } from 'dva'

import ArticlesComponent from 'components/Admin/Articles'

const Articles = () => {
    return (
        <ArticlesComponent />
    )
}

export default connect()(Articles)