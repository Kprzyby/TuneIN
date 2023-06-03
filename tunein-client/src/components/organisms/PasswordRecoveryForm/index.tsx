import Loader from "@components/atoms/Loader";
import DarkButton from "@components/molecules/DarkButton";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import { createDBEndpoint, ENDPOINTS } from "../../../api/endpoint";

import * as Styled from "./styles";

const RecoverPasswordForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setErr(false);
      createDBEndpoint(ENDPOINTS.auth.recoverpassword)
        .get(values)
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
          {loading ? (
            <Loader borderColor="white transparent" />
          ) : (
            <Styled.Form onSubmit={formik.handleSubmit}>
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
                <DarkButton text="Recover password" />
              </Styled.Button>
            </Styled.Form>
          )}
        </Styled.FormWrapper>
      ) : (
        <Styled.ConfirmWrapper>
          <Styled.ConfirmContent>
            <Styled.ConfirmTitle variant="ConfirmationTitle">
              Recovery link was sent to your email
            </Styled.ConfirmTitle>
          </Styled.ConfirmContent>
        </Styled.ConfirmWrapper>
      )}
    </>
  );
};

export default RecoverPasswordForm;
