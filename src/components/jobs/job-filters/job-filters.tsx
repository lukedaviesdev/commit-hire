import { Search, MapPin, Tag, Laptop } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { Job } from '@/types/job';

interface JobFiltersProperties {
  jobs: Job[];
  onFiltersChange: (filters: JobFilters) => void;
  currentFilters: JobFilters;
}

export interface JobFilters {
  search: string;
  tag: string;
  location: string;
  savedOnly: boolean;
  remoteOnly: boolean;
}

export const JobFilters = ({
  jobs,
  onFiltersChange,
  currentFilters,
}: JobFiltersProperties) => {
  const form = useForm<JobFilters>({
    defaultValues: currentFilters,
  });

  const formValues = form.watch();

  // Only update parent when form values actually change from user interaction
  useEffect(() => {
    // Don't trigger on initial mount - only when values change
    const hasChanged =
      formValues.search !== currentFilters.search ||
      formValues.tag !== currentFilters.tag ||
      formValues.location !== currentFilters.location ||
      formValues.savedOnly !== currentFilters.savedOnly ||
      formValues.remoteOnly !== currentFilters.remoteOnly;

    if (hasChanged) {
      onFiltersChange(formValues);
    }
  }, [formValues, onFiltersChange, currentFilters]);

  // Update form when currentFilters change from URL navigation
  useEffect(() => {
    form.reset(currentFilters);
  }, [currentFilters, form]);

  // Get unique tags and locations from jobs
  const uniqueTags = useMemo(
    () => Array.from(new Set(jobs.flatMap((job) => job.tags))).sort(),
    [jobs],
  );

  const uniqueLocations = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.location))).sort(),
    [jobs],
  );

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      tag: 'all',
      location: 'all',
      savedOnly: false,
      remoteOnly: false,
    };
    form.reset(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Search
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  Search
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Search jobs, companies, or tags..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Tag
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  Tag
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    {uniqueTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  Location
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {uniqueLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="savedOnly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    Show saved jobs only
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remoteOnly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    id="remoteOnly"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel
                    htmlFor="remoteOnly"
                    className="text-sm font-normal flex items-center gap-2"
                  >
                    <Laptop
                      className="h-3 w-3 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Remote only
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={handleClearFilters}>
            Clear filters
          </Button>
        </div>
      </form>
    </Form>
  );
};
