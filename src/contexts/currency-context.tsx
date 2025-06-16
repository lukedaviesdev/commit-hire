import React, { createContext, useContext, useState, useEffect } from 'react';

import type { ReactNode } from 'react';

export interface ExchangeRates {
  [currency: string]: number;
}

export interface CurrencyContextValue {
  rates: ExchangeRates;
  isLoading: boolean;
  error: string | null;
  convert: (amount: number, fromCurrency: string, toCurrency: string) => number;
  lastUpdated: Date | null;
}

// Fallback rates if API fails
const FALLBACK_RATES: ExchangeRates = {
  USD: 1,
  EUR: 1.1,
  GBP: 1.25,
  CAD: 0.74,
  AUD: 0.67,
};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const STORAGE_KEY = 'currency_exchange_rates';
const LAST_UPDATED_KEY = 'currency_rates_last_updated';

interface CachedData {
  rates: ExchangeRates;
  timestamp: number;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined,
);

interface CurrencyProviderProperties {
  children: ReactNode;
  baseCurrency?: string;
}

export const CurrencyProvider: React.FC<CurrencyProviderProperties> = ({
  children,
  baseCurrency = 'USD',
}) => {
  const [rates, setRates] = useState<ExchangeRates>(FALLBACK_RATES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const getCachedRates = (): CachedData | null => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      const timestamp = localStorage.getItem(LAST_UPDATED_KEY);

      if (cached && timestamp) {
        const cachedData: CachedData = {
          rates: JSON.parse(cached),
          timestamp: parseInt(timestamp, 10),
        };

        // Check if cache is still valid
        if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
          return cachedData;
        }
      }
    } catch (error) {
      console.warn('Failed to parse cached exchange rates:', error);
    }
    return null;
  };

  const setCachedRates = (newRates: ExchangeRates) => {
    try {
      const timestamp = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRates));
      localStorage.setItem(LAST_UPDATED_KEY, timestamp.toString());
      setLastUpdated(new Date(timestamp));
    } catch (error) {
      console.warn('Failed to cache exchange rates:', error);
    }
  };

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Using exchangerate-api.com (free tier: 1500 requests/month)
      // In production, you might want to use your own API key
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.rates) {
        setRates(data.rates);
        setCachedRates(data.rates);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error_) {
      console.warn(
        'Failed to fetch exchange rates, using fallback rates:',
        error_,
      );
      setError(
        error_ instanceof Error
          ? error_.message
          : 'Failed to fetch exchange rates',
      );
      setRates(FALLBACK_RATES);
      setCachedRates(FALLBACK_RATES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check for cached rates first
    const cached = getCachedRates();

    if (cached) {
      setRates(cached.rates);
      setLastUpdated(new Date(cached.timestamp));
      // Don't fetch if cache is recent, but still validate in background
      if (Date.now() - cached.timestamp < CACHE_DURATION / 2) {
        return;
      }
    }

    // Fetch fresh rates
    fetchExchangeRates();
  }, [baseCurrency]);

  const convert = (
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): number => {
    if (fromCurrency === toCurrency) return amount;

    const fromRate = rates[fromCurrency] || 1;
    const toRate = rates[toCurrency] || 1;

    // Convert to base currency first, then to target currency
    const baseAmount = amount / fromRate;
    return baseAmount * toRate;
  };

  const contextValue: CurrencyContextValue = {
    rates,
    isLoading,
    error,
    convert,
    lastUpdated,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextValue => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
