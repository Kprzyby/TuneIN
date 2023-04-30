import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useRichText from '@components/molecules/RichText';
import { useFormik } from 'formik';
import DarkButton from '@components/molecules/DarkButton';
import Loader from '@components/atoms/Loader';
import { useRouter } from 'next/router';
import { convertToRaw } from 'draft-js';
import Image from 'next/image';
import * as Styled from './styles';
import { createDBEndpoint, ENDPOINTS } from '../../../api/endpoint';
import { Props } from './types';

const TuitionForm: React.FC<Props> = ({ tuition }) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<File | undefined>(undefined);
  const { renderRichText, editorState } = useRichText({ tuition });
  const [categories, setCategories] = useState<any[]>([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const hiddenFileInput = React.useRef(null);

  const getAvatar = async () => {
    if (!tuition?.imageDataURL) return;
    const dataUrl = tuition?.imageDataURL;
    const imgType = dataUrl.substring(dataUrl.indexOf(':') + 1, dataUrl.indexOf(';'));
    const blob = await (await fetch(dataUrl)).blob();
    const img = new File([blob], `avatar.${imgType}`);
    setImage(img);
  };

  useEffect(() => {
    getAvatar();
    createDBEndpoint(ENDPOINTS.tutorship.getcategories)
      .get()
      .then((res) => {
        setCategories(res.data.map((v: any) => ({ value: v, label: v })));
      });
  }, []);
  useEffect(() => {
    if (image) {
      const prevReader = new FileReader();
      prevReader.onloadend = () => { setPreview(prevReader.result as string); };
      prevReader.readAsDataURL(image);
    } else {
      setPreview(undefined);
    }
  }, [image]);

  const formik = useFormik({
    initialValues: {
      title: tuition ? tuition.title : '',
      descEditorState: editorState,
      category: tuition ? tuition.category : '',
      price: tuition ? tuition.price : 0,
      avatar: tuition ? image : {},
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
      const formData = new FormData();
      formData.append('Title', values.title);
      formData.append('Details', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
      formData.append('Price', values.price.toString());
      formData.append('Category', values.category);
      // @ts-ignore
      formData.append('Image', values.avatar);
      if (tuition === undefined) {
        createDBEndpoint(ENDPOINTS.tutorship.addTutorship)
          .post(formData, true)
          .then(() => {
            setLoading(false);
            router.back();
          })
          .catch((e: any) => {
            console.log(e.config);
            setErr(true);
            setLoading(false);
          });
      } else {
        createDBEndpoint(ENDPOINTS.tutorship.updateTutorship + tuition.id)
          .put(formData, true)
          .then(() => {
            setLoading(false);
            router.reload();
          })
          .catch((e: any) => {
            console.log(e.config);
            setErr(true);
            setLoading(false);
          });
      }
    },
  });
  const handleDelete = () => {
    if (tuition === undefined) return;
    createDBEndpoint(ENDPOINTS.tutorship.removeTutorship + tuition.id)
      .delete()
      .then(() => {
        setLoading(false);
        router.reload();
      })
      .catch(() => {
        setErr(true);
        setLoading(false);
      });
  };
  const handlePhotoClick = () => {
    // @ts-ignore
    hiddenFileInput.current.click();
  };
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const file = event.target.files[0];
    formik.setFieldValue('avatar', file);
    if (file && file.type.substr(0, 5) === 'image') {
      setImage(file);
    } else {
      setImage(undefined);
    }
  };
  return (
    <Styled.Wrapper>
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
            defaultValue={tuition && { label: tuition?.category, value: tuition?.category }}
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
          {/* Avatar */}
          <Styled.InputTitle variant="PasswordTileTitle">Avatar</Styled.InputTitle>
          <button
            type="button"
            onClick={handlePhotoClick}
            style={{ border: 'unset', background: 'transparent' }}
          >
            <DarkButton text="Upload photo" />
            <input
              placeholder="avatar"
              id="avatar"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={hiddenFileInput}
              onChange={(e) => handlePhotoChange(e)}
            />
          </button>
          {preview
            && (
            <Image
              src={preview}
              alt="preview"
              width={300}
              height={300}
              style={{ objectFit: 'contain' }}
            />
            )}
          <Styled.Error variant="PasswordTileTitle">{formik.errors.avatar}</Styled.Error>
          {/* Description */}
          <Styled.InputTitle variant="PasswordTileTitle">Opis</Styled.InputTitle>
          {renderRichText}
          {err && (<Styled.Error>Server error</Styled.Error>)}
          <div style={{ display: 'flex' }}>
            <Styled.Button type="submit">
              <DarkButton text="Publish" />
            </Styled.Button>
            {tuition && (
            <Styled.Button type="button" onClick={handleDelete}>
              <DarkButton text="Delete" />
            </Styled.Button>
            )}
          </div>
        </Styled.Form>
      )}
    </Styled.Wrapper>
  );
};
export default TuitionForm;
