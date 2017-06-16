import React from 'react'
import { styleMap } from './config'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import Editor from 'draft-js-plugins-editor'
import { Map } from 'immutable';
import prismPlugin from './prismPlugin'

const EditorPlugins = [
    prismPlugin,
    createMarkdownShortcutsPlugin()
]
const blockRenderMap = Map({
    'code-block': {
        element: 'code',
        wrapper: <pre className="public-DraftStyleDefault-pre" spellCheck={'false'} />
    }
})
const EditorArea = (props) => {
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = props.editorState.getCurrentContent();

    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
        
    }
    return (
        <div className={className}>
            <Editor 
                {...props}
                plugins={EditorPlugins}
                blockStyleFn={getBlockStyle}
                blockRenderMap={blockRenderMap}
                customStyleMap={styleMap}
            />
        </div>
    )
}

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

export default EditorArea