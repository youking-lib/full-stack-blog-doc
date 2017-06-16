import React, { Component, PropTypes } from 'react'
import { Layout, Input, Anchor, Icon, Row, Col, Button, Card, message, Popconfirm } from 'antd'
import Draft, { EditorState, RichUtils, convertFromRaw, convertToRaw, convertFromHTML, Modifier } from 'draft-js'

import EditorCore from './core'
import Style from './index.module.less'
import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'

class EditorComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            preViewBtn: false,
        }
    }
    static propTypes = {
        onSubmit: PropTypes.func,
        onEditorStateChange: PropTypes.func
    }
    onChange = (editorState) => {
        this.props.onEditorStateChange(editorState)
    }
    onResetEditor = () => {
        const { resetEditor } = this.props
        typeof resetEditor === 'function' && resetEditor()
    }
    HandlerBar = () => {
        return (
            <Row type="flex" justify="space-between">
                <Col span={6}>
                    <a><Icon type="search" />&nbsp;&nbsp;预览</a>
                </Col>
                <Col span={6} style={{textAlign: 'right'}}>
                    <Popconfirm title="Reset editor?" onConfirm={this.onResetEditor} okText="Yes" cancelText="No">
                        <a style={{color: 'red'}}>Reset</a>
                    </Popconfirm>
                    &nbsp;&nbsp;&nbsp;
                    <a onClick={this.handleSubmit}><Icon type="upload" /> Submit</a>
                </Col>
            </Row>
            )
    }
    handleSubmit = () => {
        this.props.onSubmit && this.props.onSubmit()
    }
    toggleBlockType = (blockType) => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.props.editorState,
                blockType
            )
        );
    }
    toggleInlineStyle = (inlineStyle) => {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.props.editorState,
                inlineStyle
            )
        );
    }
    onTab = (e) => {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
    }

    handleKeyCommand = (command) => {
        const { editorState } = this.props
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    render() {
        const { contentVaule, preViewBtn } = this.state
        let editorState = this.props.editorState

        return (
                <div className={Style.editor}>
                    <div className={Style.content}>
                        <div className="RichEditor-root">
                            <BlockStyleControls
                                editorState={editorState}
                                onToggle={this.toggleBlockType}
                            />
                            <InlineStyleControls
                                editorState={editorState}
                                onToggle={this.toggleInlineStyle}
                            />
                            <EditorCore
                                editorState={editorState} 
                                handleKeyCommand={this.handleKeyCommand}
                                onTab={this.onTab}
                                spellCheck
                                ref={(element) => { this.editor = element }}
                                onChange={this.onChange}
                                placeholder="内容要真实..."
                            />
                        </div>
                    </div>
                    <div className={Style.footer}>
                        {preViewBtn ? this.PreviewComponent() : this.HandlerBar()}
                    </div>
                </div>
            )
    }
}


export default EditorComponent
