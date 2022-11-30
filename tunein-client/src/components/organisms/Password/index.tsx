import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup"
import React, { useState } from "react";
import * as Styled from "./styles";
import RgbButton from "../../molecules/RgbButton"

const Password: NextPage = () =>{
    // test password value
    const testPassword: string = "trudnehaslo";
    // 
    const [success, setSuccess] = useState(false);
    const formik = useFormik({
        initialValues: {
            password:"",
            newPassword: "",
            newPasswordre: ""
        },
        validateOnBlur: false,
        validateOnChange: false,
        // TODO: password validation, must be equal to real password
        validationSchema: Yup.object({
            password: Yup.string()
                .oneOf([testPassword, null], "Password's incorrect")
                .required("Password is required"),
            newPassword: Yup.string()
                .min(8,"Password needs to be longer than 8 characters long")
                .max(20,"Password needs to be shorter than 15 characters long")
                .notOneOf([testPassword, null], "Password can't be the same as the last one")
                .required("Password is required"),
            newPasswordre: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                .required("Password is required")
          }),
        onSubmit: (values) => {
            console.log(values.newPassword);
            setSuccess(true);
        }
    })
    return(
        <Styled.Wrapper>
            <Styled.Title variant="PasswordTitile">Password Change</Styled.Title>
            {!success ? (
                <Styled.Form onSubmit={formik.handleSubmit}>
                    <Styled.Input placeholder="Password" id="password"
                        value={formik.values.password} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.password}</Styled.Error>

                    <Styled.Input placeholder="New Password" id="newPassword"
                        value={formik.values.newPassword} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.newPassword}</Styled.Error>

                    <Styled.Input placeholder="Repeat New Password" id="newPasswordre"
                        value={formik.values.newPasswordre} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.newPasswordre}</Styled.Error>

                    <RgbButton text="Change password"/>
                </Styled.Form>
            ) : (
                <Styled.Success>
                    <Styled.SuccesText variant="RegisterSuccess">You've changed</Styled.SuccesText>
                    <Styled.SuccesText variant="RegisterSuccess">your passord</Styled.SuccesText>
                </Styled.Success>
            )}
        </Styled.Wrapper>
    )
}
export default Password;
