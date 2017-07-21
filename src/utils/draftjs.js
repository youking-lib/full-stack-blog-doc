import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';

export default {
    stateToContent(editorState){
        return convertToRaw(editorState.getCurrentContent())
    },
    contentToState(contentState){
        contentState.entityMap = contentState.entityMap || {}
        const rawContent = convertFromRaw(contentState)
        const editorState = EditorState.createWithContent(rawContent)

        return editorState
    }
}
