import { EditorState, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useState } from "react";

import * as Styled from "./styles";
import { Props } from "./types";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const useRichText = ({ tuition }: Props) => {
  const [editorState, setEditorState] = useState(
    tuition
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(tuition.details))
        )
      : EditorState.createEmpty()
  );
  const handleChange = (state: EditorState) => {
    setEditorState(state);
  };

  return {
    editorState,
    renderDraftForm: (
      <Styled.Wrapper>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "emoji",
              "image",
              "history",
            ],
            inline: { inDropdown: true },
          }}
        />
      </Styled.Wrapper>
    ),
    renderDraftDisplay: (
      <Editor editorState={editorState} readOnly toolbarHidden />
    ),
  };
};

export default useRichText;
