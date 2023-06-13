import Cookies from "js-cookie";

import { ENDPOINTS, createDBEndpoint } from "../endpoint";

const userString = "user";

export const removeUserCookie = (): void => {
  Cookies.remove(userString);
};
export const setUserCookie = (user: any): void => {
  removeUserCookie();
  Cookies.set(userString, JSON.stringify(user), { expires: 1 });
};
export const getUserCookie = (): any => {
  const userCookie = Cookies.get(userString);

  if (userCookie === undefined) {
    return undefined;
  }

  return JSON.parse(userCookie);
};
export const updateUserCookie = async (userID: number) => {
  await createDBEndpoint(ENDPOINTS.user.getuserbyid)
    .get({ userId: userID })
    .then((res: any) => {
      setUserCookie(res.data);
    });
};
