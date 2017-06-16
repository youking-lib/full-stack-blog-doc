import React from 'react'
import { Table, Input, Icon, Button, Popconfirm, Modal, Form } from 'antd'

const { Column, ColumnGroup } = Table
const FormItem = Form.Item

/**
 * 单元格处理逻辑
 * 切换 编辑 和 显示 两种状态
 */
class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            value
        })
    }
    check = () => {
        this.setState({
            editable: false
        })
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({
            editable: true
        })
    }
    CellInputComp = () => {
        const { value } = this.state
        const inputProps = {
            value: value,
            onChange: this.handleChange,
            onPressEnter: this.check,
            addonAfter: <a onClick={this.check}><Icon type="check" /></a>,
        }
        return (
            <Input {...inputProps}/>
        )
    }
    CellTriggerComp = () => {
        const { value } = this.state
        return (
            <div>
                {value || ' '} &nbsp;
                <a onClick={this.edit}><Icon type="edit" /></a>
            </div>
        )
    }
    render() {
        const { value, editable } = this.state
        return (
            <div>
                { editable ? this.CellInputComp() : this.CellTriggerComp() }
            </div>
        );
    }
}

/**
 * 创建关键词 Modal
 */
const CollectionCreateForm = Form.create()( (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="添加一个关键词"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="Title">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input the title of keyword!' }],
                        })(
                            <Input placeholder="Please input the title of keyword!" />
                        )}
                    </FormItem>
                    <FormItem label="Description">
                        {getFieldDecorator('des', {
                            rules: [{ required: true, message: 'Please input the description of keyword!'}]
                        })(
                            <Input type="textarea" placeholder="Please input the description of keyword" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)

/**
 * 关键词表格
 */
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: <span>名称 &nbsp;&nbsp;&nbsp;<a onClick={this.showModal}><Icon type="plus-circle-o" /></a> </span>,
                dataIndex: 'title',
                render: (text, record, index) => (
                    <EditableCell value={text} onChange={this.onCellChange(record)} />
                ),
            },
            {
                title: '描述',
                dataIndex: 'des',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    return (
                        this.props.keywords.length > 0 ?
                        (
                            <Popconfirm title="确定删除吗?" onConfirm={() => this.onDelete(index)}>
                                <a href="#">删除</a>
                            </Popconfirm>
                        ) : null
                    )
                }
            }
        ]

        this.state = {
            count: 2,
            modalVisible: false,
        }
    }
    // edit keyword
    onCellChange = (record) => {
        return (value) => {
            const { des, _id } = record
            this.props.updateKeyword({
                des, _id, title: value
            })
        }
    }
    // delete keyword
    onDelete = (index) => {
        const target = this.props.keywords[index];
        typeof this.props.delKeyword === 'function' && this.props.delKeyword(target._id)        
    }
    // show keyword modal
    showModal = () => {
        this.setState({ modalVisible: true });
    }
    // cancle keyword modal
    handleModalCancel = () => {
        this.setState({ modalVisible: false });
    }
    // handle create keyword
    handleModalCreate = () => {
        const form = this.refs.form
        const { createKeyword } = this.props

        form.validateFields((err, values) => {
            if (err) { return }
            typeof createKeyword === 'function' && createKeyword(values)
            form.resetFields()
            this.setState({ modalVisible: false })
        })
    }

    render() {
        const columns = this.columns
        const dataSource = this.props.keywords

        return (
            <div>
                <Table 
                    size="small" 
                    loading={this.props.loading}
                    style={{margin: '10px'}} 
                    rowKey="_id" 
                    bordered 
                    dataSource={dataSource} 
                    columns={columns} 
                />
                <CollectionCreateForm
                    ref="form"
                    visible={this.state.modalVisible}
                    onCancel={this.handleModalCancel}
                    onCreate={this.handleModalCreate}
                />
            </div>
        );
    }
}

export default EditableTable