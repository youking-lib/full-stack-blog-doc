import React from 'react'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd'

import { Router, Link } from 'dva/router'

const HeaderComponent = (props) => {

    const { children, routes } = props
    const routePath = (routes[routes.length - 1] || {}).path || '/'
    
    return (
        <div>
            <Row>
                <Col span={16}>
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={[routePath]}
                        style={{ lineHeight: '64px', backgroundColor: 'transparent' }}
                    >
                        <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="archive"><Link to="archive">Archive</Link></Menu.Item>
                        <Menu.Item key="about"><Link to="about">About me</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col span={8}>
                    <div style={{ lineHeight: '64px', float: 'right', padding: '0 20px' }}>
                        {children}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HeaderComponent