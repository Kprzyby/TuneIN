import Loader from '@components/atoms/Loader';
import DarkButton from '@components/molecules/DarkButton';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { UserData } from '@components/context/UserContext';
import { createDBEndpoint } from '../../../api/endpoint';
import * as Styled from './styles';
import { Props } from './types';
import { getUserCookie, updateUserCookie } from '../../../api/cookie/userCookie';

const SingleUpdateForm: React.FC<Props> = ({ type }) => {
  const { user, setUser } = useContext(UserData);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const getValidation = () => {
    if (type === 'email') {
      return Yup.object({
        value: Yup.string()
          .email('Email is not valid')
          .required('Email is required'),
      });
    }
    if (type === 'username') {
      return Yup.object({
        value: Yup.string()
          .min(5, 'username needs to be longer than 5 characters long')
          .max(15, 'username needs to be shorter than 15 characters long')
          .required('username is required'),
      });
    }
    return 0;
  };

  const formik = useFormik({
    initialValues: { value: '' },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: getValidation(),
    onSubmit: (values) => {
      setLoading(true);
      setErr(false);
      let dbPath = '';
      let dbValue = '';
      if (type === 'email') {
        dbPath = 'UpdateEmailAsync';
        dbValue = 'email';
      } else if (type === 'username') {
        dbPath = 'UpdateUsernameAsync';
        dbValue = 'Username';
      }
      createDBEndpoint(`User/${user?.id}/${dbPath}`)
        .patch({ [dbValue]: values.value })
        .then(async () => {
          if (user === undefined) return;
          await updateUserCookie(user.id);
          setUser(getUserCookie());
          setLoading(false);
          setSuccess(true);
        })
        .catch(() => {
          setErr(true);
          setLoading(false);
        });
    },
  });
  return (
    <>
      {!success ? (
        <Styled.FormWrapper>
          {loading ? (
            <Loader borderColor="white transparent" />
          ) : (
            <Styled.Form onSubmit={formik.handleSubmit}>
              <Styled.InputTitle variant="PasswordTileTitle">{type.toUpperCase()}</Styled.InputTitle>
              <Styled.Input
                placeholder="value"
                id="value"
                value={formik.values.value}
                onChange={formik.handleChange}
              />
              <Styled.Error>{formik.errors.value}</Styled.Error>
              {err && (<Styled.Error>Wrong credentials</Styled.Error>)}

              <Styled.Button type="submit">
                <DarkButton text="Submit" />
              </Styled.Button>
            </Styled.Form>
          )}
        </Styled.FormWrapper>
      ) : (
        <Styled.ConfirmWrapper>
          <Styled.ConfirmContent>
            <Styled.ConfirmTitle variant="ConfirmationTitle">
              Success
            </Styled.ConfirmTitle>
          </Styled.ConfirmContent>
        </Styled.ConfirmWrapper>
      )}
    </>
  );
};

export default SingleUpdateForm;
