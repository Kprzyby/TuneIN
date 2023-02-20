import { NextPage } from 'next'
// import UserRegister from '@components/organisms/UserRegister';
// import Password from '@components/organisms/Password';
// import TuitionRegister from '@components/organisms/TuitionRegister';
import Heropage from '@components/organisms/Heropage';
import TuitionRegister from '@components/organisms/TuitionRegister';
const Homepage: NextPage = () =>{
    return(
        <>
            <Heropage/>
            <TuitionRegister/>
            <TuitionRegister/>
        </>
    );
}

export default Homepage;
