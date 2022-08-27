import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import { ErrorResponseData } from '../commonTypes';
import { screen, theater } from '@prisma/client';

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
  screens: {
    no: number;
  }[];
  id: number;
  name: string;
}[];
