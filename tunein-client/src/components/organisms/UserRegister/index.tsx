import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup"
import * as Styled from "./styles";
import RgbButton from "../../molecules/RgbButton"

const UserRegister: React.FC = () => {
    // if form was submitted
    const [success, setSuccess] = useState(false);
    const formik = useFormik({
        initialValues: {
            login:"",
            password:"",
            passwordre: "",
            email: ""
        },
        // TODO: validation for login and email repetition
        validationSchema: Yup.object({
            login: Yup.string()
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
            passwordre: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Password is required")
          }),
        onSubmit: (values) => {
            // TODO: add sending email api
            console.log(values);
            setSuccess(true);
        }
    })
    // TODO: copying pasting values to inputes should not heve different colors than normal ones
    // TODO: more responsive
    return(
        <Styled.Wrapper>
            <Styled.Title variant="RegisterTitile">Register</Styled.Title>
            {!success ? (
                <Styled.Form onSubmit={formik.handleSubmit}>
                    <Styled.Input placeholder="Login" id="login"
                        value={formik.values.login} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.login}</Styled.Error>
                    <Styled.Input placeholder="Password" id="password"
                        value={formik.values.password} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.password}</Styled.Error>
                    <Styled.Input placeholder="Repeat Password" id="passwordre"
                        value={formik.values.passwordre} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.passwordre}</Styled.Error>
                    <Styled.Input placeholder="Email" id="email"
                        value={formik.values.email} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.email}</Styled.Error>
                    <RgbButton text="Sign in"/>
                </Styled.Form>
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