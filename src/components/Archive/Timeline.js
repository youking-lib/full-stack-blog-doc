import React from 'react'
import { Timeline, Icon, Spin } from 'antd'
import { Link } from 'dva/router'
import { formatDate, generateTagColor } from '../../utils'
import Style from './index.module.less'

export default ({archives}) => {
    return (
        <Timeline>
            {archives.map(item => {
                if (item.records.length > 0) {
                    return (
                        <Timeline.Item key={item._id} color={generateTagColor()}>
                            <div><Icon type="calendar" /> &nbsp;{formatDate(item.date)}</div>
                            <div className={Style.timelineWrap}>
                                {item.records.map(record => 
                                    <div key={record._id} className={Style.timelineArchor}>
                                        <Link to={`/article/${record.quoteId}`}>{record.title}</Link>
                                    </div>
                                )}
                            </div>
                        </Timeline.Item>
                    )
                }
            })}
        </Timeline>
    )
}

