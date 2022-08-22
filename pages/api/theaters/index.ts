import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponseData | GetResponseData>
) {
  switch (req.method) {
    case 'GET':
      const orderBy = req.query as GetRequestData;

      const theaters = await prisma.theater.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: orderBy,
      });

      res.status(200).json(theaters);
      break;

    case 'POST':
      try {
        const body = req.body as PostRequestData;

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

export type PostRequestData = Prisma.theaterCreateInput;
export interface PostResponseData {
  message: string;
}

export type GetRequestData = Prisma.theaterOrderByWithRelationInput;
export type GetResponseData = SimpleTheater[];

interface SimpleTheater {
  id: number;
  name: string;
}
