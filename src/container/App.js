import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Layout, Menu, Breadcrumb, Row, Col, Icon } from 'antd'

import HeaderComponent from 'components/Header'
import FooterComponent from 'components/Footer'
import LoginModel from 'components/Login'

const { Header, Content, Footer } = Layout

const App = ({children, routes}) => {
    return (
        <Layout>
            <Header>
                <HeaderComponent routes={routes}>
                    <LoginModel doLogin={() => {}} />
                </HeaderComponent>
            </Header>
            <Content style={{ margin: '24px 100px 0', background: '#fff', minHeight: 280, overflow: 'hidden' }}>
                {children}
            </Content>
            <Footer>
                <FooterComponent />
            </Footer>
        </Layout>
    )
}

export default connect()(App)