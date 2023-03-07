import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup"
import React, { cloneElement, useEffect, useState } from "react";
import * as Styled from "./styles";
import RgbButton from "../../molecules/RgbButton"

const ChangePassword: NextPage = () =>{
    // test password value
    const testPassword: string = "trudnehaslo";
    // 
    const [success, setSuccess] = useState(false);
    const [boxSize, setBoxSize] = useState(0.4);
    const [textSize, setTextSize] = useState(1);
    const [borderSize, setBorderSize] = useState(0.188);
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
    const breakpoints = {
        medium: {
            width: 500,
            boxSize: 0.4,
            textSize: 1.2,
            borderSize: 0.188
        },
        small: {
            width: 200,
            boxSize: 0.2,
            textSize: 0.7,
            borderSize: 0.1
        }
      }
    const handleResize = () => {
        let currentSize = window.outerWidth;
        Object.values(breakpoints).map(e => {
            if(currentSize >= e.width) return;
            setBoxSize(e.boxSize);
            setTextSize(e.textSize);
            setBorderSize(e.borderSize);
        })
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return (
        <Styled.Wrapper>
            <Styled.Title variant="PasswordTitile">Password Change</Styled.Title>
            {!success ? (
                <Styled.Form onSubmit={formik.handleSubmit}>
                    <Styled.TileTitle variant="PasswordTileTitle">Old password</Styled.TileTitle>
                    <Styled.Input isSecure placeholder="Password" id="password"
                        value={formik.values.password} 
                        onChange={formik.handleChange}/>
                    <Styled.Error variant="PasswordTileTitle">{formik.errors.password}</Styled.Error>
                    <Styled.TileTitle variant="PasswordTileTitle">New password</Styled.TileTitle>
                    <Styled.Input isSecure placeholder="New Password" id="newPassword"
                        value={formik.values.newPassword} 
                        onChange={formik.handleChange}/>
                    <Styled.Error variant="PasswordTileTitle">{formik.errors.newPassword}</Styled.Error>
                    <Styled.TileTitle variant="PasswordTileTitle">Repeat new password</Styled.TileTitle>
                    <Styled.Input isSecure placeholder="Repeat New Password" id="newPasswordre"
                        value={formik.values.newPasswordre} 
                        onChange={formik.handleChange}/>
                    <Styled.Error variant="PasswordTileTitle">{formik.errors.newPasswordre}</Styled.Error>
                    {cloneElement(
                        <RgbButton text="Change password" 
                            boxSize={boxSize} 
                            textSize={textSize}
                            borderSize={borderSize}/>)}
                </Styled.Form>
            ) : (
                <Styled.Success>
                    <Styled.SuccesText variant="RegisterSuccess">You've changed</Styled.SuccesText>
                    <Styled.SuccesText variant="RegisterSuccess">your password</Styled.SuccesText>
                </Styled.Success>
            )}
        </Styled.Wrapper>
    )
}
export default ChangePassword;
