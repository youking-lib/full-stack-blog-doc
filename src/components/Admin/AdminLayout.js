import React, { Component } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Layout, Menu, Icon } from 'antd'

import Style from './index.module.less'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

class AdminLayout extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        })
    }

    componentDidMount() {
        setTimeout(() => this.onCollapse(true), 3000)
    }

    render(){
        const {children, history, routes} = this.props
        const routePath = (routes[routes.length - 1] || {}).path || ''

        return (
            <Layout>
                <Sider
                  collapsible
                  collapsed={this.state.collapsed}
                  onCollapse={this.onCollapse}
                  style={{minHeight: 500}}
                >
                    <Menu mode={this.state.mode} defaultSelectedKeys={[routePath]}>
                        <Menu.Item key="add">
                            <Link to="/admin/editor">
                                <Icon type="plus" />
                                <span className="nav-text">写文章</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="articles">
                            <Link to="/admin/articles">
                                <Icon type="file" />
                                <span className="nav-text">文章列表</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                          key="sub1"
                          title={<span><Icon type="setting" /><span className="nav-text">配置</span></span>}
                        >
                            <Menu.Item key="keywords"><Link to="/admin/keywords">关键词</Link></Menu.Item>
                            <Menu.Item key="carousel"><Link to="/admin/carousel">_旋转木马</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content style={{ margin: '0 0 0 16px', background: '#fff' }}>
                    {children}
                </Content>
            </Layout>
        )
    }
}

export default AdminLayout