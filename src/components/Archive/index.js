import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Timeline, Icon, Spin } from 'antd'

import UserCard from 'components/UserCard'
import TimelineComponent from './Timeline'

const Archive = ({archives, loading}) => {
    return (
        <div style={{ padding: '16px'}}>
            <Row gutter={24}>
                <Col span={6}>
                    <UserCard />
                </Col>
                <Col span={18 }>
                    <Spin spinning={loading}>
                        <div style={{minHeight: 400}}>
                            {archives ? <TimelineComponent archives={archives} /> : '可能还没写文章 = ='}
                        </div>
                    </Spin>
                </Col>
            </Row>
        </div>
    )
}

export default Archive