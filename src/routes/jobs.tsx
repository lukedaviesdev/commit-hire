import { createFileRoute } from '@tanstack/react-router';

import { JobsPage } from '@/pages/jobPage';

export interface JobsSearch {
  search?: string;
  tag?: string;
  location?: string;
  savedOnly?: boolean;
  remoteOnly?: boolean;
  minSalary?: number;
  currency?: string;
}

const validateStringParameter = (value: unknown): string | undefined => {
  return value !== undefined && value !== null ? value.toString() : undefined;
};

const validateBooleanParameter = (value: unknown): boolean | undefined => {
  return value !== undefined && value !== null
    ? value === 'true' || value === true
    : undefined;
};

const validateNumberParameter = (value: unknown): number | undefined => {
  if (value === undefined || value === null) return undefined;
  const number_ = parseInt(value.toString(), 10);
  return !isNaN(number_) && number_ > 0 ? number_ : undefined;
};

const validateCurrencyParameter = (value: unknown): string | undefined => {
  const currency = validateStringParameter(value);
  // Validate against supported currencies
  const supportedCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  return currency && supportedCurrencies.includes(currency)
    ? currency
    : undefined;
};

export const Route = createFileRoute('/jobs')({
  validateSearch: (search: Record<string, unknown>): JobsSearch => {
    // Only include params that are actually present in the URL
    const result: JobsSearch = {};

    const searchParameter = validateStringParameter(search.search);
    if (searchParameter) result.search = searchParameter;

    const tagParameter = validateStringParameter(search.tag);
    if (tagParameter) result.tag = tagParameter;

    const locationParameter = validateStringParameter(search.location);
    if (locationParameter) result.location = locationParameter;

    const savedOnlyParameter = validateBooleanParameter(search.savedOnly);
    if (savedOnlyParameter) result.savedOnly = savedOnlyParameter;

    const remoteOnlyParameter = validateBooleanParameter(search.remoteOnly);
    if (remoteOnlyParameter) result.remoteOnly = remoteOnlyParameter;

    const minSalaryParameter = validateNumberParameter(search.minSalary);
    if (minSalaryParameter) result.minSalary = minSalaryParameter;

    const currencyParameter = validateCurrencyParameter(search.currency);
    if (currencyParameter) result.currency = currencyParameter;

    return result;
  },
  component: JobsPage,
});
