import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    console.log(req.body);
    res.status(200).json(req.body);
  }
}

interface ResponseData {
  test: string;
}
