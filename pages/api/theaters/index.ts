import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    try {
      const body = req.body as RequestData;

      await prisma.theater.create({
        data: { ...body },
      });

      res.status(201).end();
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  } else {
    res.status(405).end();
  }
}

interface RequestData extends Prisma.theaterCreateInput {
  subway: string;
  bus: string;
  car: string;
  parking: string;
}

interface ResponseData {
  message: string;
}
