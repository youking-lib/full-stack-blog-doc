import React, { Component } from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'

import Style from './index.module.less'
import UserCard from 'components/UserCard'
import ArticleList from './ArticleList'

class Home extends Component {
    render(){
        return (
            <div style={{ padding: '16px'}}>
                <Row gutter={24}>
                    <Col span={6}>
                        <UserCard />
                    </Col>
                    <Col span={18 }>
                        <ArticleList />
                    </Col>
                </Row>
            </div>
        )
    }
}

Home.PropTypes = {
}

export default Home