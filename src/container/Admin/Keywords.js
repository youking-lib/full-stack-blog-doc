import React from 'react'
import { connect } from 'dva'

import KeywrodsComponent from 'components/Admin/Keywords'

const Keywrods = (props) => {
    return (
        <KeywrodsComponent {...props} />
    )
}

const mapStateToProps = ({keyword, loading}, ownProps) => {
    const { keywords } = keyword
    return {
        keywords,
        loading: loading.effects['keyword/requireKeywords']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delKeyword(_id){
            dispatch({type: 'keyword/del', payload: _id})
        },
        createKeyword({title, des}){
            dispatch({type: 'keyword/create', payload: {title, des}})
        },
        updateKeyword({title, des, _id}){
            dispatch({type: 'keyword/update', payload: {title, des, _id}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keywrods)