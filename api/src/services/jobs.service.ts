import { findAllJobs } from '../repositories/jobs.repository.js';


export async function listJobs(page: number, limit: number) {
  const jobs = await findAllJobs(page, limit);

  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.empresa,
    location: job.location,
    url: job.url,
    publishedAt: job.publishedAt,
    source: job.source.name,
  }));
}
