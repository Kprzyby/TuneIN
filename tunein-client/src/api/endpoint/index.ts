// const axios = require("axios");
import axios from "axios";

export const BASE_URL = "https://localhost:7074/";

export const ENDPOINTS = {
  auth: {
    signup: "Auth/SignUpAsync",
    signin: "Auth/SignInAsync",
    signout: "Auth/SignOutAsync",
    confirmaccount: "Auth/ConfirmAccountAsync",
    recoverpassword: "Auth/RecoverPasswordAsync",
    changepassword: "Auth/ChangePasswordAsync",
  },
  user: {
    getuserbyid: "User/GetUserAsync",
    getusers: "User/GetAllUsersAsync",
    getusernames: "User/GetAllUsernames",
  },
  tutorship: {
    gettutorshipbyid: "Tutorship/GetTutorshipAsync/",
    getcategories: "Tutorship/GetCategories",
    gettutorships: "Tutorship/GetTutorshipsAsync",
    getusertutorships: "Tutorship/GetTutorshipsForUserAsync/",
    addTutorship: "Tutorship/AddTutorshipAsync",
    updateTutorship: "Tutorship/UpdateTutorshipAsync/",
    removeTutorship: "Tutorship/DeleteTutorshipAsync/",
  },
  chat: {
    createChat: "Chat/CreateChatAsync",
    getChats: "Chat/GetChatsAsync",
    getMessages: "Chat/GetMessagesAsync",
    sendMessage: "Chat/SendMessageAsync",
  },
  playlists: {
    getPlaylist: "Playlist/GetPlaylistAsync/",
    deletePlaylist: "Playlist/DeletePlaylistAsync/",
    renamePlaylist: "Playlist/ChangePlaylistNameAsync/",
    getUserPlaylists: "Playlist/GetPlaylistsAsync",
    getPlaylistsData: "Playlist/GetAmountsAsync",
    addPlaylist: "Playlist/AddPlaylistAsync/",
    addSong: "Playlist/AddTrackToPlaylistAsync/",
    removeSong: "Playlist/DeleteTrackFromPlaylistAsync/",
  },
  songs: {
    getSongSearch: "APICalls/GetSearchListAsync",
    getSongDtAddPlaylist: "APICalls/GetTrackInfoAndAddAsync",
    getTrackInfo: "APICalls/GetTrackInfoAsync",
    addSong: "Tracks/AddTrackAsync",
  },
};
// TODO: change any
export const createDBEndpoint = (endpoint: string) => {
  const url = `${BASE_URL + endpoint}/`;
  /* eslint-disable global-require */
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const https = require("https");
  /* eslint-enable global-require */
  // TODO: change temporary solution to permament one
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  axios.defaults.withCredentials = true;
  const aHeaders = {
    form: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    text: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  };

  return {
    post: (newRecord: any, isForm?: boolean) =>
      axios({
        method: "post",
        url,
        data: newRecord,
        params: newRecord,
        httpsAgent,
        headers: isForm ? aHeaders.form : aHeaders.text,
      }),
    put: (updatedRecords: any, isForm?: boolean) =>
      axios({
        method: "put",
        url,
        data: updatedRecords,
        params: updatedRecords,
        httpsAgent,
        headers: isForm ? aHeaders.form : aHeaders.text,
      }),
    get: (record?: any) =>
      axios({
        method: "get",
        url,
        params: record,
        httpsAgent,
      }),
    delete: (deletedRecords?: any) =>
      axios({
        method: "delete",
        url,
        data: deletedRecords,
        params: deletedRecords,
        httpsAgent,
      }),
    patch: (patchedRecords?: any) =>
      axios({
        method: "patch",
        url,
        data: patchedRecords,
        params: patchedRecords,
        httpsAgent,
      }),
  };
};
