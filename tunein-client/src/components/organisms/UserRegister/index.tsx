import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import DarkButton from "@components/molecules/DarkButton";
import Loader from "@components/atoms/Loader";

import { createDBEndpoint, ENDPOINTS } from "../../../api/endpoint";

import * as Styled from "./styles";

const UserRegister: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      repeatPassword: "",
      email: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(5, "Login needs to be longer than 5 characters long")
        .max(15, "Login needs to be shorter than 15 characters long")
        .required("Login is required"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password needs to be longer than 8 characters long")
        .max(20, "Password needs to be shorter than 15 characters long")
        .required("Password is required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setErr(false);
      createDBEndpoint(ENDPOINTS.auth.signup)
        .post(values)
        .then(() => {
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
          <Styled.Title variant="RegisterTitile">Register</Styled.Title>
          {loading ? (
            <Loader borderColor="white transparent" />
          ) : (
            <Styled.Form onSubmit={formik.handleSubmit}>
              <Styled.InputTitle variant="PasswordTileTitle">
                Login
              </Styled.InputTitle>
              <Styled.Input
                placeholder="Login"
                id="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
              />
              <Styled.Error>{formik.errors.userName}</Styled.Error>

              <Styled.InputTitle variant="PasswordTileTitle">
                Password
              </Styled.InputTitle>
              <Styled.Input
                isSecure
                placeholder="Password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <Styled.Error>{formik.errors.password}</Styled.Error>

              <Styled.InputTitle variant="PasswordTileTitle">
                Repeat Password
              </Styled.InputTitle>
              <Styled.Input
                isSecure
                placeholder="Repeat Password"
                id="repeatPassword"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
              />
              <Styled.Error>{formik.errors.repeatPassword}</Styled.Error>

              <Styled.InputTitle variant="PasswordTileTitle">
                Email
              </Styled.InputTitle>
              <Styled.Input
                placeholder="Email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <Styled.Error>{formik.errors.email}</Styled.Error>

              {err && <Styled.Error>Wrong credentials</Styled.Error>}

              <Styled.Button type="submit">
                <DarkButton text="Register" />
              </Styled.Button>
            </Styled.Form>
          )}
        </Styled.FormWrapper>
      ) : (
        <Styled.ConfirmWrapper>
          <Styled.ConfirmContent>
            <Styled.ConfirmTitle variant="ConfirmationTitle">
              Thank you for creating account
            </Styled.ConfirmTitle>
            <Styled.ConfirmDesc variant="ConfirmationDesc">
              Activated link was sent to your email
            </Styled.ConfirmDesc>
          </Styled.ConfirmContent>
        </Styled.ConfirmWrapper>
      )}
    </>
  );
};

export default UserRegister;
