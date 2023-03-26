import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useRichText from '@components/molecules/RichText';
import { useFormik } from 'formik';
import DarkButton from '@components/molecules/DarkButton';
import Loader from '@components/atoms/Loader';
import { useRouter } from 'next/router';
import { convertToRaw } from 'draft-js';
import * as Styled from './styles';
import { createDBEndpoint, ENDPOINTS } from '../../../api/endpoint';

const TuitionRegister: React.FC = () => {
  const { renderRichText, editorState } = useRichText();
  const [categories, setCategories] = useState<any[]>([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    createDBEndpoint(ENDPOINTS.tutorship.getcategories)
      .get()
      .then((res) => {
        setCategories(res.data.map((v: any) => ({ value: v, label: v })));
      })
      .catch(() => {
      });
  }, []);
  const formik = useFormik({
    initialValues: {
      title: '',
      descEditorState: editorState,
      category: '',
      price: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(12, 'No shorter than 12 characters')
        .max(70, 'No longer than 70 characters'),
      category: Yup.string()
        .required('Catrgory is required'),
      price: Yup.number()
        .min(0, 'Price cannot be negative')
        .required('Price is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setErr(false);
      createDBEndpoint(ENDPOINTS.tutorship.addTutorship)
        .post({
          title: values.title,
          details: convertToRaw(editorState.getCurrentContent()),
          price: values.price,
          category: values.category,
        })
        .then(() => {
          setLoading(false);
          router.push('/profile');
        })
        .catch(() => {
          setErr(true);
          setLoading(false);
        });
    },
  });
  return (
    <Styled.Wrapper>
      <Styled.Title variant="RegisterTitile">Create Tuition</Styled.Title>
      {loading ? (
        <Loader borderColor="white transparent" />
      ) : (
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
          {/* Category */}
          <Styled.InputTitle variant="PasswordTileTitle">Category</Styled.InputTitle>
          <Styled.Category
            options={categories}
            onChange={(selectedOption: any) => formik.setFieldValue('category', selectedOption.value)}
            instanceId="category"
          />
          <Styled.Error variant="PasswordTileTitle">{formik.errors.category}</Styled.Error>
          {/* Price */}
          <Styled.InputTitle variant="PasswordTileTitle">Price</Styled.InputTitle>
          <Styled.Input
            placeholder="Input price"
            id="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <Styled.Error variant="PasswordTileTitle">{formik.errors.price}</Styled.Error>
          {/* Description */}
          <Styled.InputTitle variant="PasswordTileTitle">Opis</Styled.InputTitle>
          {renderRichText}
          {err && (<Styled.Error>Server error</Styled.Error>)}
          <Styled.Button type="submit">
            <DarkButton text="Publish" />
          </Styled.Button>
        </Styled.Form>
      )}
    </Styled.Wrapper>
  );
};
export default TuitionRegister;
