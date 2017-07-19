import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'antd'

import Style from './index.module.less'
import UserCard from 'components/UserCard'
import ArticleList from './ArticleList'

class Home extends Component {
    render(){
        const { articles, handleEditArticle, loading, keywords } = this.props
        return (
            <div style={{ padding: '16px'}}>
                <Row gutter={24}>
                    <Col span={6}>
                        <UserCard />
                    </Col>
                    <Col span={18 }>
                        <ArticleList loading={loading} keywords={keywords} articles={articles} handleEditArticle={handleEditArticle} />
                    </Col>
                </Row>
            </div>
        )
    }
}

Home.PropTypes = {
    articles: PropTypes.Array
}

export default Home