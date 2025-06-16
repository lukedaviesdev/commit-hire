import { DollarSign } from 'lucide-react';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
];

interface CurrencySelectorProperties {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export const CurrencySelector = ({
  value,
  onValueChange,
  disabled = false,
}: CurrencySelectorProperties) => {
  return (
    <FormItem>
      <FormLabel className="flex items-center gap-2">
        <DollarSign
          className="h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        Currency
      </FormLabel>
      <Select onValueChange={onValueChange} value={value} disabled={disabled}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {SUPPORTED_CURRENCIES.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <div className="flex items-center gap-2">
                <span>{currency.flag}</span>
                <span>{currency.symbol}</span>
                <span className="font-medium">{currency.code}</span>
                <span className="text-muted-foreground">- {currency.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
