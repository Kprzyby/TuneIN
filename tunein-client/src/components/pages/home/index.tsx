import { NextPage } from 'next'
import UserRegister from '@components/organisms/UserRegister';
import Password from '@components/organisms/Password';
import TuitionRegister from '@components/organisms/TuitionRegister';
import Heropage from '@components/organisms/Heropage';
import HomeRegister from '@components/organisms/HomeRegister';
//TODO: consider adding scrollIntoView here instead of event in a single section(heropage)
const Homepage: NextPage = () =>{
    return(
        <>
            <Heropage/>
            <HomeRegister/>
        </>
    );
}

export default Homepage;
