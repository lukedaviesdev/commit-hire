export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  applyUrl: string;
  salaryRange?: {
    min: number;
    max: number;
    currency?: string;
  };
  remote?: boolean;
}
