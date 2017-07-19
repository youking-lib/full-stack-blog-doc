import React from 'react'
import { connect } from 'dva'

import HomeComponent from 'components/Home'

const Home = (props) => {
    return (
        <HomeComponent {...props} />
    )
}

const mapStateToProps = ({ article, loading, keyword }) => {
    const { articles } = article
    const { keywords } = keyword
    
    return {
        articles, keywords, 
        loading: loading.effects['article/query']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleEditArticle(articleDoc){
            dispatch({type: 'article/handleEditArticle', payload: articleDoc})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)