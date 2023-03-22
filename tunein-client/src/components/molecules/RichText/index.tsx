import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)  
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import React, { useState } from 'react';
import * as Styled from './styles';

const useRichText = () => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(),
  );
  const handleChange = (state: EditorState)=>{
    setEditorState(state);
  }
  return {
    editorState,
    renderRichText:(
      <Styled.Wrapper>
        <Editor 
          editorState={editorState} 
          onEditorStateChange={handleChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: [
              'inline', 'blockType', 'fontSize', 'fontFamily', 'list', 
              'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'history'
            ],
            inline: { inDropdown: true },
          }}
        />
      </Styled.Wrapper>
    )}
}
export default useRichText;
