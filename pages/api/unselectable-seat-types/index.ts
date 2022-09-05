import { unselectable_seat_type } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import type { ErrorResponseData } from '../commonTypes';
export type { ErrorResponseData };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseData | GetResponseData>
) {
  try {
    switch (req.method) {
      case 'GET':
        const unselectableSeatTypes =
          await prisma.unselectable_seat_type.findMany();

        res.status(200).json(unselectableSeatTypes);
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

export type GetResponseData = unselectable_seat_type[];
