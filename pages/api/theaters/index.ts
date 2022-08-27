import { Prisma, theater } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseData | GetResponseData | PostResponseData>
) {
  try {
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

          const theater = await prisma.theater.create({
            data: { ...body },
          });

          res.status(201).json(theater);
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
}

export type PostRequestData = Prisma.theaterCreateInput;
export type PostResponseData = theater;
export interface ErrorResponseData {
  message: string;
}

export type GetRequestData = Omit<
  Prisma.theaterOrderByWithRelationInput,
  'screens'
>;
export type GetResponseData = Pick<theater, 'id' | 'name'>[];
