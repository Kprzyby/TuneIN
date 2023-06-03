import { NextApiResponse, NextApiRequest } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id, passwordRecoveryGUID } = req.query;

  if (!id || !passwordRecoveryGUID) {
    return res.status(401).json({ message: "Server error" });
  }
  // TODO: temporary solution
  res.redirect(
    `/auth/newpassword?id=${id}&passwordRecoveryGUID=${passwordRecoveryGUID}`
  );
  res.end();

  return res.status(200).json({ message: "Fetch Succed" });
};
