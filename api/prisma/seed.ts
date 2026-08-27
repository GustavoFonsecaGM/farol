import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

await prisma.job.deleteMany();
await prisma.source.deleteMany();

const fonte = await prisma.source.create({
  data: {
    name: 'Remotive',
    baseUrl: 'https://remotive.com/api',
  },
});

await prisma.job.createMany({
  data:[{
    title: 'backend developer',
    company: 'teste',
    url: 'https://teste.com/vaga/1',
    sourceId: fonte.id,
  },
  {
    title: 'frontend developer',
    company: 'teste',
    url: 'https://teste.com/vaga/2',
    sourceId: fonte.id,
  },
  {
    title: 'fullstack developer',
    company: 'teste',
    url: 'https://teste.com/vaga/3',
    sourceId: fonte.id,
  }
],
});



const todas = await prisma.job.findMany();
console.log(`${todas.length} jobs created`);

await prisma.$disconnect();