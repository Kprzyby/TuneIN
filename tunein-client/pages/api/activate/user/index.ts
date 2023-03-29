import { NextApiResponse, NextApiRequest } from 'next';
import { createDBEndpoint, ENDPOINTS } from '../../../../src/api/endpoint';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { email, confirmationGUID } = req.query;
  if (!email || !confirmationGUID) {
    return res.status(401).json({ message: 'Cannot Validate User' });
  }
  const putValue = {
    email,
    confirmationGUID,
  };
  createDBEndpoint(ENDPOINTS.auth.confirmaccount)
    .put(putValue)
    .then(() => {
      res.writeHead(307, { Location: '/auth/useractivated' });
      res.end();
      return res.status(200).json({ message: 'Fetch Succed' });
    })
    .catch((error) => {
      res.status(500).send(error);
      res.end();
      return res.status(400).json({ message: 'Fetch Failed' });
    });
  return res.status(200).json({ message: 'Validated User' });
};
