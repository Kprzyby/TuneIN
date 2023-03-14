import { NextApiResponse, NextApiRequest } from 'next'

export default async (req: NextApiRequest , res: NextApiResponse): Promise<void> => {
    const { email, passwordRecoveryGUID } = req.query;
    if(!email || !passwordRecoveryGUID) {
        return res.status(401).json({message: "Server error"});
    }
    //TODO: temporary solution
    res.redirect(`/auth/newpassword?email=${email}&passwordRecoveryGUID=${passwordRecoveryGUID}`);
    res.end();
}
