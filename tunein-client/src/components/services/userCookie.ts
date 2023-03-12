import Cookies from 'js-cookie';

export const setUserCookie = (user: any): void => {
    Cookies.remove("user");
    Cookies.set("user", user, {expires: 12});
};
export const getUserCookie: any = () => {
    const userCookie = Cookies.get("user");
    if(userCookie == undefined){
        return {};
    } else {
        return JSON.parse(userCookie);
    }
};
