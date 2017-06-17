import React, { Component } from 'react'
import { Layout, Input, Anchor, Icon, message, Select, Col } from 'antd'

import Style from './index.module.less'
import Editor from '../Editor'
const { Header, Content } = Layout
const { Link } = Anchor
const Option = Select.Option
const InputGroup = Input.Group

class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            titleValue: this.props.draft.title || '',
            selectedKeywords: []
        }
    }

    onTitleValueChange = (e) => {
        this.props.handleDraftChange({
            title: e.target.value
        })
    }

    onEditorStateChange = (editorState) => {
        this.props.handleDraftChange({editorState})
    }
    onResetDraft = () => {
        this.props.resetDraftEditorState()
    }
    onKeywordsSelect = (value) => {
        this.props.handleDraftChange({
            keywords: value
        })
    }

    handleEditorSubmit = (contentValue) => {
        const { draft } = this.props
        const { keywords } = this.props
        if(draft.title){
            this.props.handleSubmitDraft(draft)
        }else{
            message.error('不能没有标题哦！')
        }
    }

    render(){
        const { title, content, editorState, keywords } = this.props.draft
        const keywordsOrigin = this.props.keywords
        const selectOptions = keywordsOrigin.map(item => <Option key={item._id}>{item.title}</Option>)
        return (
            <div style={{height: '100%'}}>
                <Header style={{padding: '16px'}}>
                    <InputGroup size="large">
                        <Col span="16">
                            <Input onChange={this.onTitleValueChange} value={ title } placeholder="请输入标题" />
                        </Col>
                        <Col span="8">
                            <Select
                                mode="multiple"
                                size="large"
                                style={{ width: '100%', display: 'block' }}
                                placeholder="Please select"
                                value={keywords}
                                onChange={(value) => this.onKeywordsSelect(value)}
                            >
                                {selectOptions}
                            </Select>
                        </Col>
                    </InputGroup>
                </Header>
                <Content>
                    <Editor 
                        resetEditor={this.onResetDraft} 
                        onSubmit={this.handleEditorSubmit} 
                        editorState={editorState} 
                        onEditorStateChange={this.onEditorStateChange} 
                    />
                </Content>
            </div>
            )
    }
}


export default EditorComponent