import { NextApiResponse, NextApiRequest } from 'next'
import { createDBEndpoint, ENDPOINTS } from "../../../../src/api/endpoint";

export default async (req: NextApiRequest , res: NextApiResponse): Promise<void> => {
    const { email, confirmationGUID } = req.query;
    if(!email || !confirmationGUID) {
        return res.status(401).json({message: "Cannot Validate User"});
    }
    createDBEndpoint(ENDPOINTS.auth.confirmaccount)
        .put({email, confirmationGUID})
        .then(() => {
            res.writeHead(307, { Location: '/auth/useractivated' });
            res.end();
        })
        .catch((error) => {
            res.status(500).send(error);
            res.end();
        });
}
