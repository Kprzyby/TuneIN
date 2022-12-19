import { NextPage } from 'next'
import App from './App'
import UserRegister from '@components/organisms/UserRegister';
import Password from '@components/organisms/Password';
import TuitionRegister from '@components/organisms/TuitionRegister';
//<App/>
const Homepage: NextPage = () =>{
    return(
        <div>
            <TuitionRegister />
            <Password />
            <UserRegister />
        </div>
    );
}

export default Homepage;
