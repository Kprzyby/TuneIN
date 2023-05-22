import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import DarkButton from '@components/molecules/DarkButton';
import { UserData } from '@components/context/UserContext';
import Loader from '@components/atoms/Loader';
import Link from 'next/link';
import { createDBEndpoint, ENDPOINTS } from '../../../api/endpoint';
import * as Styled from './styles';

const UserLogin: React.FC = () => {
  const { setUser } = useContext(UserData);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setErr(false);
      createDBEndpoint(ENDPOINTS.auth.signin)
        .post(values)
        .then((res) => {
          setLoading(false);
          setUser(res.data);
          router.back();
        })
        .catch(() => {
          // TODO: more precise validation error from backend
          setErr(true);
          setLoading(false);
        });
    },
  });
  return (
    <Styled.Wrapper>
      <Styled.Title variant="Navigation">Login</Styled.Title>
      {loading ? (
        <Loader borderColor="white transparent" />
      ) : (
        <Styled.Form onSubmit={formik.handleSubmit}>
          <Styled.InputTitle variant="PasswordTileTitle">Email</Styled.InputTitle>
          <Styled.Input
            placeholder="Email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Styled.Error>{formik.errors.email}</Styled.Error>

          <Styled.InputTitle variant="PasswordTileTitle">Password</Styled.InputTitle>
          <Styled.Input
            type="password"
            placeholder="Password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Styled.Error>{formik.errors.password}</Styled.Error>

          {err && (<Styled.Error>Wrong credentials</Styled.Error>)}

          <Styled.Button style={{ paddingRight: '0', marginLeft: 'auto' }} type="button">
            <Link href="/auth/recoverpassword"><Styled.RecoveryText>Recover Password</Styled.RecoveryText></Link>
          </Styled.Button>
          <Styled.Button type="submit">
            <DarkButton text="Login" />
          </Styled.Button>
        </Styled.Form>
      )}
    </Styled.Wrapper>
  );
};
export default UserLogin;
