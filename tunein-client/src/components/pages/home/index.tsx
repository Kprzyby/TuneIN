import { NextPage } from 'next'
import App from './App'
import Register from '@components/organisms/Register';
const Homepage: NextPage = () =>{
    return(
        <div>
            <h1>Welcome to TuneIN</h1>
            <h2>web design trudny ehh</h2>
            <App/>
            <Register />
        </div>
    );
}

export default Homepage;
