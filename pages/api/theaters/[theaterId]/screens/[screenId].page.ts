import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import { Prisma } from '@prisma/client';
import type { ErrorResponseData } from '../../../commonTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | ErrorResponseData>
) {
  try {
    switch (req.method) {
      case 'GET':
        const foundScreen = await findScreen(getTheaterId(), getScreenId());
        res.status(200).json(foundScreen);
        break;

      case 'PUT':
        try {
          const body = req.body as PutRequestData;

          const updatedScreen = await prisma.screen.update({
            where: {
              theater_id_no: {
                no: getScreenId(),
                theater_id: getTheaterId(),
              },
            },
            data: {
              ...body,
            },
          });
          await res.revalidate(`/theaters/${updatedScreen.theater_id}`);

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
  function getScreenId() {
    return Number(req.query.screenId as string);
  }
}

async function findScreen(theaterId: number, screenId: number) {
  return await prisma.screen.findUnique({
    where: {
      theater_id_no: {
        theater_id: theaterId,
        no: screenId,
      },
    },
    select: getScreen,
  });
}

const getScreen = Prisma.validator<Prisma.screenSelect>()({
  total_row: true,
  total_column: true,
  aisles: {
    orderBy: [{ aisle_type_id: 'asc' }, { no: 'asc' }],
  },
  unselectable_seats: { orderBy: [{ row: 'asc' }, { column: 'asc' }] },
});

export type GetResponseData = Prisma.PromiseReturnType<typeof findScreen>;
export type PutRequestData = Prisma.screenUpdateInput;
