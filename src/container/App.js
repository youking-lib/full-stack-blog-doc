import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Layout, Menu, Breadcrumb, Row, Col, Icon } from 'antd'

import HeaderComponent from 'components/Header'
import FooterComponent from 'components/Footer'
import LoginComponent from 'components/Login'
import CarouselComponent from 'components/Carousel'

import Style from './App.module.less'

const { Header, Content, Footer } = Layout
const { HeaderRight } = HeaderComponent

const App = ({children, routes, app, doLogin}) => {
    const { isLogin, user } = app
    return (
        <div className={Style.root}>
            <CarouselComponent />
            <Layout style={{position: 'relative', zIndex: '1000', backgroundColor: 'transparent'}}>
                <Header>
                    <HeaderComponent routes={routes}>
                        {isLogin ? <HeaderRight user={user} /> : <LoginComponent doLogin={doLogin} app={app} /> }
                    </HeaderComponent>
                </Header>
                <Content style={{ margin: '24px 100px 0', backgroundColor: 'rgba(255,255,255,0.9)', minHeight: 280, overflow: 'hidden' }}>
                    {children}
                </Content>
                <Footer>
                    <FooterComponent />
                </Footer>
            </Layout>
        </div>
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