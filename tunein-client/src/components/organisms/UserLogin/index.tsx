import { useFormik } from "formik";
import React, { cloneElement, useEffect, useState } from "react";
import * as Yup from "yup"
import * as Styled from "./styles";
import RgbButton from "../../molecules/RgbButton"
import {createDBEndpoint, ENDPOINTS} from "../../../api/endpoint";
import { useRouter } from "next/router";

const UserLogin: React.FC = () => {
    const [boxSize, setBoxSize] = useState(0);
    const [textSize, setTextSize] = useState(0);
    const [borderSize, setBorderSize] = useState(0);
    const formik = useFormik({
        initialValues: {
            email: "",
            password:"",
            repeatPassword: ""
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email is not valid")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required"),
            repeatPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Password is required")
        }),
        onSubmit: (values) => {
            const {email, password} = values;
            const newValues = {email, password};
            createDBEndpoint(ENDPOINTS.auth.signin)
                .post(newValues)
                .then((res) => {
                    console.log(res);
                    const router = useRouter();
                    router.push("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    })
    const breakpoints = {
        xxxlarge: {
            width: 9999,
            boxSize: 0.8,
            textSize: 3,
            borderSize: 0.12
        },
        xxlarge: {
            width: 1500,
            boxSize: 0.8,
            textSize: 2.4,
            borderSize: 0.12
        },
        xlarge: {
            width: 1200,
            boxSize: 0.6,
            textSize: 1.7,
            borderSize: 0.12
        },
        large: {
            width: 800,
            boxSize: 0.5,
            textSize: 1.2,
            borderSize: 0.12
        },
        medium: {
            width: 600,
            boxSize: 0.5,
            textSize: 1,
            borderSize: 0.12
        },
        small: {
            width: 300,
            boxSize: 0.4,
            textSize: 0.8,
            borderSize: 0.12
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
    return(
        <Styled.Wrapper>
            <Styled.Title variant="RegisterTitile">Login</Styled.Title>
                <Styled.Form onSubmit={formik.handleSubmit}>
                    <Styled.InputTitle variant="PasswordTileTitle">Email</Styled.InputTitle>
                    <Styled.Input placeholder="Email" id="email"
                        value={formik.values.email} 
                        onChange={formik.handleChange}/>
                    <Styled.Error>{formik.errors.email}</Styled.Error>

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

                    {cloneElement(
                        <RgbButton 
                            text="Login" 
                            boxSize={boxSize} 
                            textSize={textSize}
                            borderSize={borderSize}/>)}
            </Styled.Form>
        </Styled.Wrapper>
    )
}
export default UserLogin;
