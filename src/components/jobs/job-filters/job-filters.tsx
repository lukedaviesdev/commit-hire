import { Search, MapPin, Tag, Laptop, DollarSign } from 'lucide-react';
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCurrency } from '@/contexts/currency-context';

import { CurrencySelector, SUPPORTED_CURRENCIES } from './currency-selector';

import type { JobFilters } from '@/hooks/use-filtered-jobs';
import type { Job } from '@/types/job';

interface JobFiltersProperties {
  jobs: Job[];
  onFiltersChange: (filters: JobFilters) => void;
  currentFilters: JobFilters;
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
  const selectedCurrency = form.watch('currency');
  const {
    convert,
    isLoading: currencyLoading,
    error: currencyError,
    lastUpdated,
  } = useCurrency();

  // Only update parent when form values actually change from user interaction
  useEffect(() => {
    // Don't trigger on initial mount - only when values change
    const hasChanged =
      formValues.search !== currentFilters.search ||
      formValues.tag !== currentFilters.tag ||
      formValues.location !== currentFilters.location ||
      formValues.savedOnly !== currentFilters.savedOnly ||
      formValues.remoteOnly !== currentFilters.remoteOnly ||
      formValues.minSalary !== currentFilters.minSalary ||
      formValues.currency !== currentFilters.currency;

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

  // Calculate salary range suggestions based on current jobs and selected currency
  const salaryRangeInfo = useMemo(() => {
    const salariesInSelectedCurrency = jobs
      .filter((job) => job.salaryRange)
      .map((job) => {
        const minConverted = convert(
          job.salaryRange!.min,
          job.salaryRange!.currency!,
          selectedCurrency,
        );
        const maxConverted = convert(
          job.salaryRange!.max,
          job.salaryRange!.currency!,
          selectedCurrency,
        );
        return { min: minConverted, max: maxConverted };
      });

    if (salariesInSelectedCurrency.length === 0) {
      return { min: 0, max: 0, count: 0 };
    }

    const allSalaries = salariesInSelectedCurrency.flatMap((range) => [
      range.min,
      range.max,
    ]);
    const min = Math.min(...allSalaries);
    const max = Math.max(...allSalaries);

    return {
      min: Math.floor(min / 1000) * 1000, // Round down to nearest 1k
      max: Math.ceil(max / 1000) * 1000, // Round up to nearest 1k
      count: salariesInSelectedCurrency.length,
    };
  }, [jobs, selectedCurrency, convert]);

  const getCurrencySymbol = (currencyCode: string) => {
    return (
      SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode)?.symbol ||
      currencyCode
    );
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      tag: 'all',
      location: 'all',
      savedOnly: false,
      remoteOnly: false,
      minSalary: undefined,
      currency: 'USD',
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

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <CurrencySelector
                value={field.value}
                onValueChange={field.onChange}
                disabled={currencyLoading}
              />
            )}
          />

          <FormField
            control={form.control}
            name="minSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  Minimum Salary
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`e.g., ${getCurrencySymbol(selectedCurrency)}${salaryRangeInfo.min.toLocaleString()}`}
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? parseInt(value, 10) : undefined);
                    }}
                  />
                </FormControl>
                {salaryRangeInfo.count > 0 && (
                  <FormDescription>
                    Available range: {getCurrencySymbol(selectedCurrency)}
                    {salaryRangeInfo.min.toLocaleString()} -{' '}
                    {getCurrencySymbol(selectedCurrency)}
                    {salaryRangeInfo.max.toLocaleString()}
                  </FormDescription>
                )}
                {currencyError && (
                  <FormDescription className="text-destructive">
                    ⚠️ Using offline exchange rates
                  </FormDescription>
                )}
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

        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {lastUpdated && (
              <span>
                Exchange rates updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear filters
          </Button>
        </div>
      </form>
    </Form>
  );
};
