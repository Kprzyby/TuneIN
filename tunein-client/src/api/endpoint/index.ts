import axios from 'axios';

export const BASE_URL = 'https://localhost:44324/';

export const ENDPOINTS = {
    auth: {
        signup: 'Auth/SignUpAsync',
        signin: 'Auth/SignInAsync',
        signout: 'Auth/SignOutAsync',
        confirmaccount: 'Auth/ConfirmAccountAsync',
        recoverpassword: 'Auth/RecoverPasswordAsync',
        changepassword: 'Auth/ChangePasswordAsync'
    },
    chat: 'CHAT',
    library: 'LIBRARY'
}
//TODO: change any
export const createDBEndpoint = (endpoint: string) => {
    let url = BASE_URL + endpoint + '/';
    return {
        post: (newRecord: any) => axios.post(url, newRecord),
        put: (updatetRecord: any) => axios.put(url, {params:[...updatetRecord]}),
        get: () => axios.get(url)
    }
}
