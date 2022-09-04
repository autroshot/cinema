import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import type { ErrorResponseData } from '../commonTypes';
import { Prisma, screen } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseData | GetResponseData | PostResponseData>
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

      case 'POST':
        try {
          const body = req.body as PostRequestData;

          const screen = await prisma.screen.create({
            data: {
              no: body.no,
              total_row: body.total_row,
              total_column: body.total_column,
              theater_id: body.theater_id,
              unselectable_seats: {
                createMany: {
                  data: [...body.unselectable_seats],
                },
              },
              aisles: {
                createMany: {
                  data: [...body.aisles],
                },
              },
            },
          });

          res.status(201).json(screen);
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

export type GetResponseData = {
  id: number;
  name: string;
  screens: {
    no: number;
  }[];
}[];

export type PostRequestData = {
  no: number;
  total_row: number;
  total_column: number;
  theater_id: number;
  unselectable_seats: {
    row: number;
    column: number;
    unselectable_seat_type_id: number;
  }[];
  aisles: {
    no: number;
    aisle_type_id: number;
  }[];
};
export type PostResponseData = screen;
