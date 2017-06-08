import React from 'react'
import { Tag } from 'antd'

import Style from './index.module.less'

const Article = () => {
    return (
        <div style={{ background: '#fff', padding: '16px', minHeight: 280, overflow: 'hidden' }}>
            <div className={Style.header}>
                <h1>
                    <a>【单页面从前端到后端】Antd + dva 搭建前后台界面</a>
                </h1>
                <div className={Style.caption}>
                    <div className={Style.captionTag}>
                        <Tag color="red">Javascript</Tag>
                    </div>
                    <div className={Style.meta}>
                        <span> 2017-6-8 | 89浏览 </span>
                    </div>
                </div>
            </div>
            <div className={Style.content}>
                内容
            </div>
        </div>
    )   
}

export default Article