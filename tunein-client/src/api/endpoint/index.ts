import axios from 'axios';

export const BASE_URL = 'https://localhost:7074/';

export const ENDPOINTS = {
    auth: {
        signup: 'Auth/SignUpAsync',
        signin: 'Auth/SignInAsync',
        signout: 'Auth/SignOutAsync',
        confirmaccount: 'Auth/ConfirmAccountAsync',
        recoverpassword: 'Auth/RecoverPasswordAsync',
        changepassword: 'Auth/ChangePasswordAsync',
        getuserbyid: 'Auth/GetUserAsync'
    },
    chat: 'CHAT',
    library: 'LIBRARY'
}
//TODO: change any
export const createDBEndpoint = (endpoint: string) => {
    let url = BASE_URL + endpoint + '/';
    const https = require('https');
    //TODO: change temporary solution to permament one
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    
    return {
        post: (newRecord: any) => axios.post(url, newRecord),
        put: (updatedRecords: any) => axios({
            method: 'put', 
            url: url, 
            params: updatedRecords, 
            httpsAgent: httpsAgent}),
        get: (record: any) => axios({
            method: 'get', 
            url: url,
            params: record,
            httpsAgent: httpsAgent})
    }
}
