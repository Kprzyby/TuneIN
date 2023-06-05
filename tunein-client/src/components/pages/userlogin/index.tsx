import UserLogin from "@components/organisms/UserLogin";
import { NextPage } from "next";
import React from "react";

import withAuth from "../../../api/pageAuth";

const Login: NextPage = () => <UserLogin />;

export default withAuth(Login, false);
