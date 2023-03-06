import axios from 'axios';
import { NextApiResponse, NextApiRequest } from 'next'
import { createDBEndpoint, ENDPOINTS } from "../../../../src/api/endpoint";

export default async (req: NextApiRequest , res: NextApiResponse) => {
    const { email, confirmationGUID } = req.query;
    console.log(email+" "+confirmationGUID);
    if(!email || !confirmationGUID) {
        return res.status(401).json({message: "Cannot Validate User"});
    }
    const https = require('https');
    const httpsAgent = new https.Agent({ rejectUnauthorized: false })

    axios({
        method: 'put',
        url: 'https://localhost:44324/Auth/ConfirmAccountAsync',
        params:{
            email:email,
            confirmationGUID:confirmationGUID
        },
        httpsAgent:httpsAgent
      })
      .then(res=>console.log(res.data));
    // createDBEndpoint(ENDPOINTS.auth.confirmaccount)
    //     .put({email, confirmationGUID})
    //     .then((ares) => {
    //         console.log(ares);
    //         return res.writeHead(307, { Location: '/auth/useractivated' });
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    //     .finally(() => {
    //         process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    //     });
}   
