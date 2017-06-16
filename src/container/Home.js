import React from 'react'
import { connect } from 'dva'

import HomeComponent from 'components/Home'

const Home = (props) => {
    return (
        <HomeComponent {...props} />
    )
}

const mapStateToProps = ({article}) => {
    const { articles } = article
    return {
        articles
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