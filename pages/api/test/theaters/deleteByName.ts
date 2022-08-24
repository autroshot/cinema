import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import { Prisma } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'DELETE':
        try {
          const body = req.body as RequestData;
          await prisma.theater.delete({
            where: {
              ...body,
            },
          });
          res.status(204).end();
        } catch (err) {
          console.error(err);
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2025'
          ) {
            res.status(200).json({ message: '레코드가 존재하지 않습니다.' });
          } else {
            res.status(500).json({ message: '서버 오류' });
          }
        }
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
