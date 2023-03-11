import { useFormik } from "formik";
import React, { cloneElement, useEffect, useState } from "react";
import * as Yup from "yup"
import * as Styled from "./styles";
import RgbButton from "../../molecules/RgbButton"
import {createDBEndpoint, ENDPOINTS} from "../../../api/endpoint";

const UserRegister: React.FC = () => {
    const [boxSize, setBoxSize] = useState(0.4);
    const [textSize, setTextSize] = useState(1);
    const [borderSize, setBorderSize] = useState(0.188);
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
    // TODO: copying pasting values to inputes should not heve different colors than normal ones
    // TODO: more responsive
    return(
        <Styled.Wrapper>
            <Styled.Title variant="RegisterTitile">Register</Styled.Title>
            {!success ? (
                <Styled.Form onSubmit={formik.handleSubmit}>
                    <Styled.TileTitle variant="PasswordTileTitle">Login</Styled.TileTitle>
                    <Styled.Input placeholder="Login" id="userName"
                        value={formik.values.userName} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.userName}</Styled.Error>
                    <Styled.TileTitle variant="PasswordTileTitle">Password</Styled.TileTitle>
                    <Styled.Input isSecure placeholder="Password" id="password"
                        value={formik.values.password} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.password}</Styled.Error>
                    <Styled.TileTitle variant="PasswordTileTitle">Repeat Password</Styled.TileTitle>
                    <Styled.Input isSecure placeholder="Repeat Password" id="repeatPassword"
                        value={formik.values.repeatPassword} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.repeatPassword}</Styled.Error>
                    <Styled.TileTitle variant="PasswordTileTitle">Email</Styled.TileTitle>
                    <Styled.Input placeholder="Email" id="email"
                        value={formik.values.email} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.email}</Styled.Error>
                    {cloneElement(
                        <RgbButton text="Sign up" 
                            boxSize={boxSize} 
                            textSize={textSize}
                            borderSize={borderSize}/>)}
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
