import React from 'react'
import { Tabs, Card, Tag, Icon, Row, Col, Button, Dropdown, Menu } from 'antd'
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

const ArticleList = ({articles, handleEditArticle}) => {
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Lastest" key="1">
                    <div className={Style.articleWrap}>
                        {articles.map(item => <ArticleItem handleEditArticle={handleEditArticle} key={item._id} article={item} />)}
                    </div>
                </TabPane>
                <TabPane tab="Javascript" key="2">Javascript</TabPane>
                <TabPane tab="HTML5" key="7">HTML5</TabPane>
                <TabPane tab="Nodejs" key="8">Nodejs</TabPane>
                <TabPane tab="CSS3" key="9">CSS3</TabPane>
            </Tabs>
        </div>
        )
}

export default ArticleList