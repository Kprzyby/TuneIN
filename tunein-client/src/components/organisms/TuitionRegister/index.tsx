import React from 'react';
import * as Styled from './styles';
import * as Yup from "yup"
import useRichText from '@components/molecules/RichText';
import { useFormik } from 'formik';
import RgbButton from '@components/molecules/RgbButton';
import { convertToRaw, EditorState } from 'draft-js';

const TuitionRegister: React.FC = () => {
  const formik = useFormik({
      initialValues: {
        editorState: EditorState.createEmpty(),
        title: ""
      },
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema: Yup.object({
        title: Yup.string()
          .min(12, "No shorter than 12 characters")
          .max(70, "No longer than 70 characters")
          .required("Title is required"),
      }),
      onSubmit: () => {
        // convertToRaw(editorState.getCurrentContent()) returns json
      }
  })
  const {renderRichText, editorState} = useRichText();
  return (
    <Styled.Wrapper>
      <Styled.Form onSubmit={formik.handleSubmit}>
      {/*Title*/}
      <Styled.TileTitle variant="PasswordTileTitle">Title</Styled.TileTitle>
      <Styled.Input placeholder="Title" id="title"
          value={formik.values.title} 
          onChange={formik.handleChange}/>
      <Styled.Error variant="PasswordTileTitle">{formik.errors.title}</Styled.Error>
      {/*Description*/}
      <Styled.TileTitle variant="PasswordTileTitle">Opis</Styled.TileTitle>
      {renderRichText}
      <RgbButton text="Publish" />
      </Styled.Form>
    </Styled.Wrapper>
  )
}
export default TuitionRegister;
