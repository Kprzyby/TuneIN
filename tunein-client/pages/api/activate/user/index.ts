import { NextApiResponse, NextApiRequest } from 'next'
import { createDBEndpoint, ENDPOINTS } from "../../../../src/api/endpoint";

export default async (req: NextApiRequest , res: NextApiResponse) => {
    const { email, confirmationGUID } = req.body;
    if(!email || !confirmationGUID) {
        return res.status(401).json({message: "Cannot Validate User"});
    }
    createDBEndpoint(ENDPOINTS.auth.confirmaccount)
        .put({email, confirmationGUID})
        .then((ares) => {
            console.log(ares);
            res.writeHead(307, { Location: '/auth/useractivated' });
        })
        .catch((error) => {
            console.log(error);
        });
}   
