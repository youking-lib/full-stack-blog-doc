import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Timeline, Icon, Spin } from 'antd'

import UserCard from 'components/UserCard'
import TimelineComponent from './Timeline'

const Archive = () => {
    return (
        <div style={{ padding: '16px'}}>
            <Row gutter={24}>
                <Col span={6}>
                    <UserCard />
                </Col>
                <Col span={18 }>
                    <TimelineComponent />
                </Col>
            </Row>
        </div>
    )
}

export default Archive