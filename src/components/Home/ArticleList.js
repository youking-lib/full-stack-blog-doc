import React, { Component } from 'react'
import { Tabs, Card, Tag, Icon, Row, Col, Button, Dropdown, Menu, Spin } from 'antd'
import { Link } from 'dva/router'
import PropTypes from 'prop-types'

import { generateTagColor } from '../../utils'
import Style from './index.module.less'

const { TabPane } = Tabs

const DropDownMenu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">导出为 Markdown</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">复制</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">分享</a>
        </Menu.Item>
    </Menu>
)

const ArticleItem = ({article, handleEditArticle}) => {
    return (
        <Card>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={18}>
                    <h1><Link to={`/article/${article._id}`}>{article.title}</Link></h1>
                    <p>
                        <Icon type="calendar" /> 2017-6-8
                        &nbsp;&nbsp;&nbsp;
                        <Icon type="user" /> {article.author}
                    </p>
                    <div>
                        {article.keywords.map(keyword => <Tag key={keyword._id} color={generateTagColor()}>{keyword.title}</Tag>)}
                    </div>
                </Col>
                <Col span={6}>
                    <Button type="defalut"><a onClick={() => {handleEditArticle(article)}}><Icon type="edit" />Edit</a></Button>
                    <Dropdown overlay={DropDownMenu}>
                        <a className="ant-dropdown-link" href="#">
                            &nbsp;&nbsp;&nbsp; more<Icon type="down" />
                        </a>
                    </Dropdown>
                </Col>
            </Row>
        </Card>
    )
}

const TabPaneComponent = ({loading, articles, handleEditArticle}) => {
    return (
        <Spin spinning={loading} tip="Loading...">
            <div className={Style.articleWrap}>
                {articles && articles.map(item => <ArticleItem handleEditArticle={handleEditArticle} key={item._id} article={item} />)}
            </div>
        </Spin>
    )
}

class ArticleList extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            articles: null
        }
    }

    componentWillReceiveProps({articles}) {
        this.setState({
            articles
        })
    }

    handleClickTabClick = (keyword) => {
        let articles

        if (keyword === 'Lastest') {
            articles = this.props.articles.slice(0, 5)
        } else {
            articles = this.props.articles.filter(item => {
                const keywords = item.keywords
                const index = keywords.findIndex(item => item.title === keyword)

                return index !== -1
            })
        }


        this.setState({
            articles
        })
    }

    render(){
        const { loading, keywords, handleEditArticle } = this.props
        const { articles } = this.state

        return (
            <div>
                <Tabs onTabClick={this.handleClickTabClick} defaultActiveKey="Lastest">
                    <TabPane tab="Lastest" key="Lastest">
                        <TabPaneComponent loading={loading} articles={articles} handleEditArticle={handleEditArticle} />
                    </TabPane>

                    { keywords.map(item => 
                        <TabPane tab={item.title} key={item.title}>
                            <TabPaneComponent loading={loading} articles={articles} handleEditArticle={handleEditArticle} />
                        </TabPane> 
                    ) }
                </Tabs>
            </div>
        )
    }
}

// const ArticleList = ({articles, handleEditArticle, loading}) => {
//     function handleClick(props) {
        
//     }

//     return (
//         <div>
//             <Tabs onTabClick={handleClick} defaultActiveKey="Lastest">
//                 <TabPane tab="Lastest" key="Lastest">
//                     <Spin spinning={loading} tip="Loading...">
//                         <div className={Style.articleWrap}>
//                             {articles.map(item => <ArticleItem handleEditArticle={handleEditArticle} key={item._id} article={item} />)}
//                         </div>
//                     </Spin>
//                 </TabPane>
//                 <TabPane tab="Javascript" key="Javascript">Javascript</TabPane>
//                 <TabPane tab="HTML5" key="HTML5">HTML5</TabPane>
//                 <TabPane tab="Nodejs" key="Nodejs">Nodejs</TabPane>
//                 <TabPane tab="CSS3" key="CSS3">CSS3</TabPane>
//             </Tabs>
//         </div>
//     )
// }

export default ArticleList
