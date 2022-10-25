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
    return +(req.query.theaterId as string);
  }
  function getScreenId() {
    return +(req.query.screenId as string);
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
  aisles: true,
  unselectable_seats: true,
});

export type GetResponseData = Prisma.PromiseReturnType<typeof findScreen>;
export type PutRequestData = Prisma.theaterUpdateInput;
