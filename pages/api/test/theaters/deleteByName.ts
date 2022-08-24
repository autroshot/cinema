import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'DELETE':
        const body = req.body as RequestData;
        await prisma.theater.delete({
          where: {
            ...body,
          },
        });
        res.status(204).end();
        break;

      default:
        res.status(405).end();
        break;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
}

export interface RequestData {
  name: string;
}
