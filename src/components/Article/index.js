import React, { Component } from 'react' 
import Style from './index.module.less'
import { Tag, Spin } from 'antd'
import Editor from '../Editor/core'
import { formatDate, generateTagColor } from '../../utils'

class ArticleComponent extends Component {
    constructor(props) {
        super(props)
        const { editorState } = props.preview
        this.state = {
            editorState
        }
    }

    componentWillReceiveProps(nextProps) {
        const { editorState } = nextProps.preview

        this.setState({
            editorState
        })
    }

    getBody = () => {
        const { preview } = this.props
        const { editorState } = this.state

        return (
            <div className={Style.wrap}>
                <div className={Style.header}>
                    <h1>
                        <a>{preview.title}</a>
                    </h1>
                    <div className={Style.caption}>
                        <div className={Style.captionTag}>
                            {
                                preview.keywords.map(keyword => 
                                    <Tag key={keyword._id} color={generateTagColor()}>{keyword.title}</Tag>
                                )
                            }
                        </div>
                        <div className={Style.meta}>
                            <span>{formatDate(preview.meta.updateAt)} | 89浏览 </span>
                        </div>
                    </div>
                </div>
                <div className={Style.content}>
                        <Editor readOnly={true} onChange={this.onChange} spellCheck={true} editorState={editorState} />
                </div>
            </div>
        )
    }

    onChange = (editorState) => this.setState({editorState})
    
    render(){
        const { loading } = this.props

        return (
            <Spin spinning={loading}>
                <div className={Style.body}>
                    { !loading && this.getBody()}
                </div>
            </Spin>
        )
    }
}


export default ArticleComponent