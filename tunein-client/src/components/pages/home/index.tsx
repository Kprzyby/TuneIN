import { NextPage } from 'next'
import App from './App'
import Register from '@components/organisms/Register';
import Password from '@components/organisms/Password';
//<App/>
const Homepage: NextPage = () =>{
    return(
        <div>
            <Password />
            <Register />
        </div>
    );
}

export default Homepage;
