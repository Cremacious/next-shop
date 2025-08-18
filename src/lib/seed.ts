import { PrismaClient } from '@prisma/client';
import { products } from '@/lib/sampleData';

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: products });

  console.log('Database seeded successfully');
}

main();
// npx tsx src/lib/seed.ts