import { createDBEndpoint, ENDPOINTS } from "../endpoint";

export const getUserById = (id: any): any => {
    createDBEndpoint(ENDPOINTS.auth.getuserbyid)
        .get({userId: id})
        .then((res) => {
            console.log("id: ", id, "user", res.data);
            return res.data;
        })
        .catch((error) => {
            console.log(error);
            return null;
        })
}
