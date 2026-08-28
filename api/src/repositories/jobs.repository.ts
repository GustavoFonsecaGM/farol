import { prisma } from '../lib/prisma.js';

export async function findAllJobs(page: number, limit: number) {
  return prisma.job.findMany({
    include: { source: true },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
}
