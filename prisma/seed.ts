import { theaters, screens, aisleTypes, unselectableSeatTypes } from './data';
import { prisma } from '../db';

async function main() {
  await prisma.screen.deleteMany();
  await prisma.theater.deleteMany();
  await prisma.aisle_type.deleteMany();
  await prisma.unselectable_seat_type.deleteMany();

  await prisma.$queryRaw`ALTER TABLE theater AUTO_INCREMENT = 1`;
  await prisma.theater.createMany({
    data: theaters,
    skipDuplicates: true,
  });

  await prisma.screen.createMany({
    data: screens,
    skipDuplicates: true,
  });

  await prisma.aisle_type.createMany({
    data: aisleTypes,
    skipDuplicates: true,
  });

  await prisma.unselectable_seat_type.createMany({
    data: unselectableSeatTypes,
    skipDuplicates: true,
  });
}

main();
