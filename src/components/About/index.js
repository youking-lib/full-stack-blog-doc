import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import UserCard from 'components/UserCard'

const About = () => {
    return (
        <div style={{ background: '#fff', padding: '16px', minHeight: 280, overflow: 'hidden' }}>
            <Row gutter={24}>
                <Col span={6}>
                    <UserCard />
                </Col>
                <Col span={18 }>
                    About
                </Col>
            </Row>
        </div>
    )
}

export default About