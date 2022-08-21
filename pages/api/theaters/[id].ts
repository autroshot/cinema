import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case 'PUT':
      // TODO:
      break;

    case 'DELETE':
      // TODO:
      break;

    default:
      res.status(405).end();
      break;
  }
}

export interface ResponseData {
  message: string;
}
