import React from 'React'
import { connect } from 'dva'

import ArticleComponent from 'components/Article'

const Article = () => {
    return (
        <ArticleComponent />
    )
}

export default connect()(Article)