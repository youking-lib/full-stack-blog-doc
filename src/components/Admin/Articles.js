import React from 'react'
import { Table, Spin, Popconfirm } from 'antd'
import { Link } from 'dva/router'
import { formatDate } from '../../utils'

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
}

const Articles = ({articles, deleteArticle, loading, handleEditArticle, handleDelArticle}) => {
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            render: (text, record, index) => {
                return <Link to={`/article/${record._id}`}>{record.title}</Link>
            }
        }, {
            title: '作者',
            dataIndex: 'author',
        }, {
            title: '创建时间',
            dataIndex: 'meta.createAt',
            render(text){
                return formatDate(text)
            }
        }, {
            title: '关键词',
            dataIndex: 'keywords',
            render(text, record, index){
                let keywords = record['keywords'] || []
                let titleArr = keywords.map(item => item.title)
                return (
                    <span>{titleArr.join(', ')}</span>
                    )
            }
        }, {
            title: '操作',
            render(text, record, index){
                return (
                    <span>
                        <a onClick={() => {handleEditArticle(record)}}>编辑</a>
                        <span className="ant-divider" />
                        <Popconfirm title="Are you sure？" onConfirm={() => { handleDelArticle(record._id) }}>
                            <a href="#">Delete</a>
                        </Popconfirm>
                    </span>
                    )
            }
        }
    ]
    return (
        <div>
            <Table 
                loading={loading} 
                rowSelection={rowSelection} 
                columns={columns} 
                rowKey="_id" 
                dataSource={articles} 
            />
        </div>
    )
}



module.exports = Articles

