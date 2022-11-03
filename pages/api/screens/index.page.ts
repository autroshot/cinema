import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import type { ErrorResponseData } from '../commonTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseData | GetResponseData>
) {
  try {
    switch (req.method) {
      case 'GET':
        const theatersIncludingScreens = await prisma.theater.findMany({
          select: {
            id: true,
            name: true,
            screens: {
              select: {
                no: true,
              },
            },
          },
          orderBy: { id: 'asc' },
        });

        res.status(200).json(theatersIncludingScreens);
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

export type GetResponseData = {
  id: number;
  name: string;
  screens: {
    no: number;
  }[];
}[];
