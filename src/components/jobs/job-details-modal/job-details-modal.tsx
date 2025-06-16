import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { useJobById } from '@/hooks/use-job-by-id';

import { JobDetailsModalContent } from './job-details-modal-content';
import { JobDetailsModalStates } from './job-details-modal-states';

interface JobDetailsModalProperties {
  jobId: string;
}

export const JobDetailsModal = ({ jobId }: JobDetailsModalProperties) => {
  const navigate = useNavigate();
  const lastFocusedReference = useRef<HTMLElement | null>(null);
  const { data: job, isLoading, error } = useJobById(jobId);

  useEffect(() => {
    // Store the last focused element
    lastFocusedReference.current = document.activeElement as HTMLElement;
    // Disable body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable body scroll
      document.body.style.overflow = '';
      // Restore focus
      lastFocusedReference.current?.focus();
    };
  }, []);

  const handleClose = () => {
    navigate({ to: '/jobs' });
  };

  const handleKeyDown = (_error: React.KeyboardEvent) => {
    if (_error.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[600px]"
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
      >
        <VisuallyHidden asChild>
          <DialogTitle>Job Details</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription>
            View detailed information about this job posting
          </DialogDescription>
        </VisuallyHidden>

        <AnimatePresence mode="wait">
          {isLoading || error || !job ? (
            <JobDetailsModalStates isLoading={isLoading} error={error} />
          ) : (
            <JobDetailsModalContent job={job} />
          )}
        </AnimatePresence>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
