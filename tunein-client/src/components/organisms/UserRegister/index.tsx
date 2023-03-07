import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup"
import * as Styled from "./styles";
import { createDBEndpoint, ENDPOINTS } from "../../../api/endpoint";
import DarkButton from "@components/molecules/DarkButton";

const UserRegister: React.FC = () => {
    const [success, setSuccess] = useState(false);
    const formik = useFormik({
        initialValues: {
            userName:"",
            password:"",
            repeatPassword: "",
            email: ""
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(5,"Login needs to be longer than 5 characters long")
                .max(15,"Login needs to be shorter than 15 characters long")
                .required("Login is required"),
            email: Yup.string()
                .email("Email is not valid")
                .required("Email is required"),
            password: Yup.string()
                .min(8,"Password needs to be longer than 8 characters long")
                .max(20,"Password needs to be shorter than 15 characters long")
                .required("Password is required"),
            repeatPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Password is required")
        }),
        onSubmit: (values) => {
            createDBEndpoint(ENDPOINTS.auth.signup)
                .post(values)
                .then((res) => {
                    console.log(res);
                    setSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    })
    return(
        <Styled.Wrapper>
            {!success ? (
                <>
                <Styled.Title variant="RegisterTitile">Register</Styled.Title>
                <Styled.Form onSubmit={formik.handleSubmit}>
                    <Styled.InputTitle variant="PasswordTileTitle">Login</Styled.InputTitle>
                    <Styled.Input placeholder="Login" id="userName"
                        value={formik.values.userName} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.userName}</Styled.Error>
                    <Styled.InputTitle variant="PasswordTileTitle">Password</Styled.InputTitle>
                    <Styled.Input isSecure placeholder="Password" id="password"
                        value={formik.values.password} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.password}</Styled.Error>
                    <Styled.InputTitle variant="PasswordTileTitle">Repeat Password</Styled.InputTitle>
                    <Styled.Input isSecure placeholder="Repeat Password" id="repeatPassword"
                        value={formik.values.repeatPassword} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.repeatPassword}</Styled.Error>
                    <Styled.InputTitle variant="PasswordTileTitle">Email</Styled.InputTitle>
                    <Styled.Input placeholder="Email" id="email"
                        value={formik.values.email} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.email}</Styled.Error>
                    <Styled.Button type="submit">
                        <DarkButton text={"Register"}/>
                    </Styled.Button>
                </Styled.Form>
                </>
            ) : (
                <Styled.Success>
                    <Styled.SuccesText variant="RegisterSuccess">Thank you</Styled.SuccesText>
                    <Styled.SuccesText variant="RegisterSuccess">Confirm your email</Styled.SuccesText>
                </Styled.Success>
            )}
        </Styled.Wrapper>
    )
};

export default UserRegister;
