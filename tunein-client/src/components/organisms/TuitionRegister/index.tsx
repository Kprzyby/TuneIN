import React from 'react';
import * as Yup from 'yup';
import useRichText from '@components/molecules/RichText';
import { useFormik } from 'formik';
import { EditorState } from 'draft-js';
import DarkButton from '@components/molecules/DarkButton';
import * as Styled from './styles';

const TuitionRegister: React.FC = () => {
  const { renderRichText } = useRichText();
  const formik = useFormik({
    initialValues: {
      editorState: EditorState.createEmpty(),
      title: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(12, 'No shorter than 12 characters')
        .max(70, 'No longer than 70 characters')
        .required('Title is required'),
    }),
    onSubmit: () => {
      // console.log(convertToRaw(editorState.getCurrentContent()));
      //  returns json
    },
  });
  return (
    <Styled.Wrapper>
      <Styled.Form onSubmit={formik.handleSubmit}>
        {/* Title */}
        <Styled.InputTitle variant="PasswordTileTitle">Title</Styled.InputTitle>
        <Styled.Input
          placeholder="Title"
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <Styled.Error variant="PasswordTileTitle">{formik.errors.title}</Styled.Error>
        {/* Description */}
        <Styled.InputTitle variant="PasswordTileTitle">Opis</Styled.InputTitle>
        {renderRichText}
        <Styled.Button type="submit">
          <DarkButton text="Publish" />
        </Styled.Button>
      </Styled.Form>
    </Styled.Wrapper>
  );
};
export default TuitionRegister;
