import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import { Prisma, theater } from '@prisma/client';
import type { ErrorResponseData } from '../../commonTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | ErrorResponseData>
) {
  try {
    switch (req.method) {
      case 'GET':
        const foundTheater = await prisma.theater.findUnique({
          where: {
            id: getId(),
          },
        });
        res.status(200).json(foundTheater);
        break;

      case 'PUT':
        try {
          const body = req.body as PutRequestData;

          const updatedTheater = await prisma.theater.update({
            where: {
              id: getId(),
            },
            data: {
              ...body,
            },
          });
          await res.revalidate(`/theaters/${updatedTheater.id}`);

          res.status(204).end();
        } catch (err) {
          console.error(err);
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002'
          ) {
            res.status(500).json({ message: '고유 제약 조건 오류' });
          } else {
            res.status(500).json({ message: '서버 오류' });
          }
        }
        break;

      case 'DELETE':
        const deletedTheater = await prisma.theater.delete({
          where: {
            id: getId(),
          },
        });
        await res.revalidate(`/theaters/${deletedTheater.id}`);
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

  function getId() {
    return +(req.query.theaterId as string);
  }
}

export type GetResponseData = theater | null;
export type PutRequestData = Prisma.theaterUpdateInput;
