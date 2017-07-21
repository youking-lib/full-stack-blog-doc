import React from 'React'
import { connect } from 'dva'

import ArticleComponent from 'components/Article'

const Article = (props) => {
    return (
        <ArticleComponent {...props} />
    )
}

const mapStateToProps = ({ article, loading }) => {
    const { preview } = article
    return {
        preview, loading: loading.effects['article/requireArticleToPreview']
    }
}

export default connect(mapStateToProps)(Article)