import { NextPage } from 'next'
import Heropage from '@components/organisms/Heropage';
import HomeRegister from '@components/organisms/HomeRegister';
import HomeBrowse from '@components/organisms/HomeBrowse';
import HomeCounter from '@components/organisms/HomeCounter';
import { useContext } from 'react';
import { User_data } from '@components/context/UserContext';
//TODO: consider adding scrollIntoView here instead of event in a single section(heropage)
const Homepage: NextPage = () =>{
    const { user } = useContext(User_data);
    console.log(user);
    return(
        <>
            <Heropage/>
            <HomeBrowse/>
            <HomeRegister/>
            <HomeCounter/>
        </>
    );
}

export default Homepage;
