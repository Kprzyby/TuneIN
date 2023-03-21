import React, { cloneElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
import useRichText from '@components/molecules/RichText';
import { useFormik } from 'formik';
import RgbButton from '@components/molecules/RgbButton';
import { EditorState } from 'draft-js';
import * as Styled from './styles';

const TuitionRegister: React.FC = () => {
  const [boxSize, setBoxSize] = useState(0.4);
  const [textSize, setTextSize] = useState(1);
  const [borderSize, setBorderSize] = useState(0.188);

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
  const { renderRichText } = useRichText();
  const breakpoints = {
    medium: {
      width: 500,
      boxSize: 0.4,
      textSize: 1.2,
      borderSize: 0.188,
    },
    small: {
      width: 200,
      boxSize: 0.2,
      textSize: 0.7,
      borderSize: 0.1,
    },
  };
  const handleResize = () => {
    const currentSize = window.outerWidth;
    Object.values(breakpoints).map((e) => {
      if (currentSize >= e.width) return 0;
      setBoxSize(e.boxSize);
      setTextSize(e.textSize);
      setBorderSize(e.borderSize);
      return 1;
    });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Styled.Wrapper>
      <Styled.Form onSubmit={formik.handleSubmit}>
        {/* Title */}
        <Styled.TileTitle variant="PasswordTileTitle">Title</Styled.TileTitle>
        <Styled.Input
          placeholder="Title"
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <Styled.Error variant="PasswordTileTitle">{formik.errors.title}</Styled.Error>
        {/* Description */}
        <Styled.TileTitle variant="PasswordTileTitle">Opis</Styled.TileTitle>
        {renderRichText}
        {cloneElement(
          <RgbButton
            text="Publish"
            boxSize={boxSize}
            textSize={textSize}
            borderSize={borderSize}
          />,
        )}
      </Styled.Form>
    </Styled.Wrapper>
  );
};
export default TuitionRegister;
