import React from "react";
import { NextPage } from "next";
import Heropage from "@components/organisms/Heropage";
import HomeRegister from "@components/organisms/HomeRegister";
import HomeBrowse from "@components/organisms/HomeBrowse";
import HomeCounter from "@components/organisms/HomeCounter";
// TODO: consider adding scrollIntoView here instead of event in a single section(heropage)
const Homepage: NextPage = () => (
  <>
    <Heropage />
    <HomeBrowse />
    <HomeRegister />
    <HomeCounter />
  </>
);

export default Homepage;
