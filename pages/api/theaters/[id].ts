import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import { Prisma } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case 'PUT':
      const id = +(req.query.id as string);
      const body = req.body as PutRequestData;

      try {
        await prisma.theater.update({
          where: {
            id: id,
          },
          data: {
            ...body,
          },
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
      }

      break;

    case 'DELETE':
      // TODO:
      break;

    default:
      res.status(405).end();
      break;
  }
}

export type PutRequestData = Prisma.theaterUpdateInput;

export interface ResponseData {
  message: string;
}
