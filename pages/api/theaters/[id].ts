import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import { Prisma, theater } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | ErrorResponseData>
) {
  switch (req.method) {
    case 'GET':
      try {
        const Theater = await prisma.theater.findUnique({
          where: {
            id: getId(),
          },
        });
        res.status(200).json(Theater);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
      }

    case 'PUT':
      const body = req.body as PutRequestData;

      try {
        await prisma.theater.update({
          where: {
            id: getId(),
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

  function getId() {
    return +(req.query.id as string);
  }
}

export type GetResponseData = theater | null;
export type PutRequestData = Prisma.theaterUpdateInput;

export interface ErrorResponseData {
  message: string;
}
