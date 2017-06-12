import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Layout, Menu, Breadcrumb, Row, Col, Icon } from 'antd'

import HeaderComponent from 'components/Header'
import FooterComponent from 'components/Footer'
import LoginComponent from 'components/Login'

const { Header, Content, Footer } = Layout
const { HeaderRight } = HeaderComponent

const App = ({children, routes, app, doLogin}) => {
    const { isLogin, user } = app
    return (
        <Layout>
            <Header>
                <HeaderComponent routes={routes}>
                    {isLogin ? <HeaderRight user={user} /> : <LoginComponent doLogin={doLogin} app={app} /> }
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

function mapStateToProps ({app}, ownProps) {
    return {
        app
    }
}
function mapDispatchToProps (dispatch) {
    return {
        doLogin({username, password}){
            dispatch({type: 'app/doLogin', payload: {username, password}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)