import { NextApiResponse, NextApiRequest } from 'next'
import { createDBEndpoint, ENDPOINTS } from "../../../../src/api/endpoint";

export default async (req: NextApiRequest , res: NextApiResponse) => {
    const { email, confirmationGUID } = req.query;
    console.log(email+" "+confirmationGUID);
    if(!email || !confirmationGUID) {
        return res.status(401).json({message: "Cannot Validate User"});
    }
    createDBEndpoint(ENDPOINTS.auth.confirmaccount)
        .get(email, confirmationGUID)
        .then((ares) => {
            console.log(ares);
            return res.writeHead(307, { Location: '/auth/useractivated' });
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
        });
}   
