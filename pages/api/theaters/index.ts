import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateResponseData | ReadManyResponseData>
) {
  switch (req.method) {
    case 'GET':
      const theaters = await prisma.theater.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      res.status(200).json(theaters);
      break;

    case 'POST':
      try {
        const body = req.body as RequestData;

        await prisma.theater.create({
          data: { ...body },
        });

        res.status(201).end();
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

    default:
      res.status(405).end();
      break;
  }
}

export interface RequestData extends Prisma.theaterCreateInput {
  subway: string;
  bus: string;
  car: string;
  parking: string;
}

export interface CreateResponseData {
  message: string;
}

export type ReadManyResponseData = SimpleTheater[];

interface SimpleTheater {
  id: number;
  name: string;
}
