import React from 'react'
import { Card, Icon } from 'antd'

import Img from '../assets/head_img.jpeg'
import Style from './UserCard.module.less'

const UserCard = () => {
    return (
        <Card bodyStyle={{ padding: 0 }}>
            <div className={Style.headerImg}>
                <img alt="" width="100%" src={Img} />
            </div>
            <div className={Style.caption}>
                <h2>whistleyz</h2>
                <div className={Style.motto}>爱前端，爱编码，文艺三年级小学生</div>
                <hr style={{margin: '4px 0 8px'}} />

                <p><Icon type="environment-o" /> China</p>
                <p><a href="mailto:whistleyz@164.com"><Icon type="mail" /> whistleyz@163.com </a></p>
                <p><a href="https://github.com/whistleyz" target="_blank"><Icon type="github" /> github </a></p>
            </div>
        </Card>
        )
}

export default UserCard