import Cookies from 'js-cookie';

export const setUserCookie = (user: any): void => {
    Cookies.remove("user");
    Cookies.set("user", JSON.stringify(user), {expires: 12});
};
export const getUserCookie: any = () => {
    const userCookie = Cookies.get("user");
    if(userCookie === undefined){
        return undefined;
    } 
    return JSON.parse(userCookie);
};
export const removeUserCookie = (): void => {
    Cookies.remove("user");
};
