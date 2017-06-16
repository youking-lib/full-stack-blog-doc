import React from 'react'
import { connect } from 'dva'

import EditorComponent from 'components/Admin/Editor'

const Editor = (props) => {
    return (
        <EditorComponent {...props} />
    )
}

const mapStateToProps = ({keyword, article}) => {
    const { keywords } = keyword
    const { draft } = article
    return {
        keywords, draft
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleDraftChange(payload){
            dispatch({type: 'article/handleDraftChange', payload})
        },
        resetDraftEditorState(){
            dispatch({type: 'article/resetDraftEditorState'})
        },
        // payload = {_id, title, content, editorState, keywords}
        handleSubmitDraft(payload){
            dispatch({type: 'article/post', payload})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)