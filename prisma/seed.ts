import { prisma } from '../db';
import testData from './testData';

async function seed() {
  await prisma.aisle.deleteMany();
  await prisma.aisle_type.deleteMany();
  await prisma.unselectable_seat.deleteMany();
  await prisma.unselectable_seat_type.deleteMany();
  await prisma.screen.deleteMany();
  await prisma.theater.deleteMany();

  await prisma.$queryRaw`ALTER TABLE theater AUTO_INCREMENT = 1`;
  await prisma.theater.createMany({
    data: testData.theaters,
    skipDuplicates: true,
  });

  await prisma.screen.createMany({
    data: testData.screens,
    skipDuplicates: true,
  });

  await prisma.aisle_type.createMany({
    data: testData.aisleTypes,
    skipDuplicates: true,
  });

  await prisma.unselectable_seat_type.createMany({
    data: testData.unselectableSeatTypes,
    skipDuplicates: true,
  });
}

seed();
