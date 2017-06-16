import React from 'react'
import { connect } from 'dva'

import ArticlesComponent from 'components/Admin/Articles'

const Articles = (props) => {
    return (
        <ArticlesComponent {...props} />
    )
}

const mapStateToProps = ({article, loading}) => {
    const { articles } = article
    return {
        articles,
        loading: loading.effects['article/query']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleEditArticle(articleDoc){
            dispatch({type: 'article/handleEditArticle', payload: articleDoc})
        },
        handleDelArticle(_id){
            dispatch({type: 'article/del', payload: _id})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)