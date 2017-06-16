import React from 'React'
import { connect } from 'dva'

import ArticleComponent from 'components/Article'

const Article = (props) => {
    return (
        <ArticleComponent {...props} />
    )
}

const mapStateToProps = ({article}) => {
    const { preview } = article
    return {
        preview
    }
}

export default connect(mapStateToProps)(Article)