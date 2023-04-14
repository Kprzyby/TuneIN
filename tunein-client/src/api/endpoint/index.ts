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
    getuserbyid: 'Auth/GetUserAsync',
    getusernames: 'Auth/GetAllUsernames',
    getusers: 'Auth/GetAllUsersAsync',
  },
  tutorship: {
    gettutorshipbyid: 'Tutorship/GetTutorshipAsync/',
    getcategories: 'Tutorship/GetCategories',
    gettutorships: 'Tutorship/GetTutorshipsAsync',
    getusertutorships: 'Tutorship/GetTutorshipsForUserAsync/',
    addTutorship: 'Tutorship/AddTutorshipAsync',
    updateTutorship: 'Tutorship/UpdateTutorshipAsync/',
    removeTutorship: 'Tutorship/DeleteTutorshipAsync/',
  },
  chat: 'CHAT',
  library: 'LIBRARY',
};
// TODO: change any
export const createDBEndpoint = (endpoint: string) => {
  const url = `${BASE_URL + endpoint}/`;
  /* eslint-disable global-require */
  const https = require('https');
  /* eslint-enable global-require */
  // TODO: change temporary solution to permament one
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  axios.defaults.withCredentials = true;
  return {
    post: (newRecord: any) => axios({
      method: 'post',
      url,
      data: newRecord,
      params: newRecord,
      httpsAgent,
    }),
    put: (updatedRecords: any) => axios({
      method: 'put',
      url,
      data: updatedRecords,
      params: updatedRecords,
      httpsAgent,
    }),
    get: (record?: any) => axios({
      method: 'get',
      url,
      params: record,
      httpsAgent,
    }),
    delete: (deletedRecords: any) => axios({
      method: 'delete',
      url,
      data: deletedRecords,
      params: deletedRecords,
      httpsAgent,
    }),
  };
};
