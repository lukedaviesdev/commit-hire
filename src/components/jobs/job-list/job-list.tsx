import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { JobCard } from '@/components/jobs/job-card/job-card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useJobs } from '@/hooks/useJobs';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const JobList = () => {
  const { data: jobs, isLoading, error } = useJobs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading jobs. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
    >
      <AnimatePresence mode="popLayout">
        {jobs?.map((job) => (
          <motion.div key={job.id} variants={item} layout>
            <JobCard job={job} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
