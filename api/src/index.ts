import Fastify from 'fastify';
import { z } from 'zod';

import { listJobs } from './services/jobs.service.js';

const listJobsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

const app = Fastify({
  logger: true,
});

app.get('/health', async () => {
  return { status: 'ok' };
});

app.get('/jobs', async (request, reply) => {
  const resultado = listJobsSchema.safeParse(request.query);

  if (!resultado.success) {
    return reply.status(400).send({
      error: 'invalid query parameters',
      details: resultado.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  const { page, limit } = resultado.data;
  return await listJobs(page, limit);
});

await app.listen({ port: 3333 });
