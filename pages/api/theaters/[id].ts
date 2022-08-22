import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import { Prisma, theater } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | ErrorResponseData>
) {
  try {
    switch (req.method) {
      case 'GET':
        const Theater = await prisma.theater.findUnique({
          where: {
            id: getId(),
          },
        });
        res.status(200).json(Theater);
        break;

      case 'PUT':
        const body = req.body as PutRequestData;

        await prisma.theater.update({
          where: {
            id: getId(),
          },
          data: {
            ...body,
          },
        });

        res.status(204).end();
        break;

      case 'DELETE':
        // TODO:
        break;

      default:
        res.status(405).end();
        break;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
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
