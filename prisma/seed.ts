import { theaters } from './data';
import { prisma } from '../db';

async function main() {
  await prisma.theater.deleteMany();
  await prisma.$queryRaw`ALTER TABLE theater AUTO_INCREMENT = 1`;
  await prisma.theater.createMany({
    data: theaters,
    skipDuplicates: true,
  });
}

main();
