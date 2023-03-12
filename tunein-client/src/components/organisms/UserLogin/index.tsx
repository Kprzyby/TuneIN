import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup"
import * as Styled from "./styles";
import {createDBEndpoint, ENDPOINTS} from "../../../api/endpoint";
import { useRouter } from "next/router";
import DarkButton from "@components/molecules/DarkButton";
import { User_data } from "@components/context/UserContext";

const UserLogin: React.FC = () => {
    const { setUser } = useContext(User_data);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: "",
            password:""
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email is not valid")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
        }),
        onSubmit: (values) => {
            createDBEndpoint(ENDPOINTS.auth.signin)
                .post(values)
                .then((res) => {
                    //setUser(values.email);
                    
                    // path to profile?
                    router.push("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    })
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
                
                <Styled.Button type="submit">
                    <DarkButton text={"Login"}/>
                </Styled.Button>
            </Styled.Form>
        </Styled.Wrapper>
    )
}
export default UserLogin;
