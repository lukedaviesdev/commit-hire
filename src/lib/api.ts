export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  applyUrl: string;
}

export interface JobsResponse {
  jobs: Job[];
}

export async function fetchJobs(): Promise<Job[]> {
  try {
    const response = await fetch('/mock/jobs.json');
    if (!response.ok) {
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`,
      );
    }
    const data: JobsResponse = await response.json();
    return data.jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export async function fetchJobById(id: string): Promise<Job | undefined> {
  try {
    const response = await fetch('/mock/jobs.json');
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data: JobsResponse = await response.json();
    return data.jobs.find((job) => job.id === id);
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
}
