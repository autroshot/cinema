import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import type { ErrorResponseData } from '../../../commonTypes';
import { Prisma, screen } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseData | PostResponseData>
) {
  try {
    switch (req.method) {
      case 'POST':
        try {
          const body = req.body as PostRequestData;

          const screen = await prisma.screen.create({
            data: {
              no: body.no,
              total_row: body.total_row,
              total_column: body.total_column,
              theater_id: getTheaterId(),
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

  function getTheaterId() {
    return Number(req.query.theaterId as string);
  }
}

export type PostRequestData = {
  no: number;
  total_row: number;
  total_column: number;
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
