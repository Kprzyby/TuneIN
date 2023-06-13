import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import DarkButton from "@components/molecules/DarkButton";
import { useRouter } from "next/router";

import { createDBEndpoint, ENDPOINTS } from "../../../api/endpoint";

import * as Styled from "./styles";

const NewPassword: NextPage = () => {
  const [user, setUser] = useState({
    id: 0,
    userName: "",
    email: "",
    userRole: "",
  });
  const [guid, setGuid] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { query } = router;

    if (
      typeof query.passwordRecoveryGUID !== "string" ||
      typeof query.id !== "string"
    )
      return;
    setGuid(Number.parseInt(query.passwordRecoveryGUID, 10));
    createDBEndpoint(ENDPOINTS.user.getuserbyid)
      .get({ userId: parseInt(query.id, 10) })
      .then((res: any) => {
        setUser(res.data);
      })
      .catch(() => null);
  }, [router.query]);
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password needs to be longer than 8 characters long")
        .max(20, "Password needs to be shorter than 15 characters long")
        .required("Password is required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const postValues = {
        email: user.email,
        password: values.password,
        repeatPassword: values.repeatPassword,
        passwordRecoveryGUID: guid,
      };

      createDBEndpoint(ENDPOINTS.auth.changepassword)
        .put(postValues)
        .then(() => {
          router.push("/auth/login");
        })
        .catch(() => {
          // console.log(error);
        });
    },
  });

  return (
    <Styled.Wrapper>
      <Styled.Title variant="RegisterTitile">New Password</Styled.Title>
      <Styled.Form onSubmit={formik.handleSubmit}>
        <div>
          <Styled.TileTitle variant="PasswordTileTitle">
            New password
          </Styled.TileTitle>
          <Styled.Input
            isSecure
            placeholder="New Password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <Styled.Error variant="PasswordTileTitle">
          {formik.errors.password}
        </Styled.Error>

        <div>
          <Styled.TileTitle variant="PasswordTileTitle">
            Repeat new password
          </Styled.TileTitle>
          <Styled.Input
            isSecure
            placeholder="Repeat New Password"
            id="repeatPassword"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
          />
        </div>
        <Styled.Error variant="PasswordTileTitle">
          {formik.errors.repeatPassword}
        </Styled.Error>

        <Styled.Button type="submit">
          <DarkButton text="Change password" />
        </Styled.Button>
      </Styled.Form>
    </Styled.Wrapper>
  );
};

export default NewPassword;
