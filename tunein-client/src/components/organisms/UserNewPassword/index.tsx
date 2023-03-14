import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup"
import React, { useEffect, useState } from "react";
import * as Styled from "./styles";
import { createDBEndpoint, ENDPOINTS } from "../../../api/endpoint";
import DarkButton from "@components/molecules/DarkButton";
import { useRouter } from "next/router";
import { getUserById } from "../../../api/user";

const NewPassword: NextPage = () =>{
    const [user, setUser] = useState({id: 0, passwordRecoveryGUID: 0});
    const router = useRouter();
    useEffect(() => {
        //@ts-ignore
        const userId = parseInt(router.query.id, 10);
        setUser(getUserById(userId));
    }, []);
    const formik = useFormik({
        initialValues: {
            password:"",
            newPassword: "",
            newPasswordre: ""
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object({
            password: Yup.string()
                .oneOf(["aa", null], "Password's incorrect")
                .required("Password is required"),
            newPassword: Yup.string()
                .min(8,"Password needs to be longer than 8 characters long")
                .max(20,"Password needs to be shorter than 15 characters long")
                .notOneOf(["aa", null], "Password can't be the same as the last one")
                .required("Password is required"),
            newPasswordre: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                .required("Password is required")
          }),
          onSubmit: (values) => {
            console.log("udalo sie");
            // createDBEndpoint(ENDPOINTS.auth.changepassword)
            //     .post(values)
            //     .then((res) => {
            //         console.log(res);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            }
    })
    return (
        <Styled.Wrapper>
            <Styled.Title variant="RegisterTitile">New Password</Styled.Title>
            <Styled.Form onSubmit={formik.handleSubmit}>
                <div>
                <Styled.TileTitle variant="PasswordTileTitle">Old password</Styled.TileTitle>
                <Styled.Input isSecure placeholder="Password" id="password"
                    value={formik.values.password} 
                    onChange={formik.handleChange}/>
                </div>
                <Styled.Error variant="PasswordTileTitle">{formik.errors.password}</Styled.Error>
                <div>
                <Styled.TileTitle variant="PasswordTileTitle">New password</Styled.TileTitle>
                <Styled.Input isSecure placeholder="New Password" id="newPassword"
                    value={formik.values.newPassword} 
                    onChange={formik.handleChange}/>
                </div>
                <Styled.Error variant="PasswordTileTitle">{formik.errors.newPassword}</Styled.Error>
                <div>
                <Styled.TileTitle variant="PasswordTileTitle">Repeat new password</Styled.TileTitle>
                <Styled.Input isSecure placeholder="Repeat New Password" id="newPasswordre"
                    value={formik.values.newPasswordre} 
                    onChange={formik.handleChange}/>
                </div>
                <Styled.Error variant="PasswordTileTitle">{formik.errors.newPasswordre}</Styled.Error>
                <Styled.Button type="submit">
                    <DarkButton text={"Change password"}/>
                </Styled.Button>
                </Styled.Form>
        </Styled.Wrapper>
    )
}
export default NewPassword;
