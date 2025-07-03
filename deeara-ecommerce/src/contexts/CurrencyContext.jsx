import React, { createContext, useContext, useEffect, useState } from 'react'

const CurrencyContext = createContext()

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CNY: '¥',
  // Add more as needed
}

const countryToCurrency = {
  US: 'USD',
  GB: 'GBP',
  IN: 'INR',
  JP: 'JPY',
  AU: 'AUD',
  CA: 'CAD',
  CN: 'CNY',
  FR: 'EUR',
  DE: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  // Add more as needed
}

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD')
  const [symbol, setSymbol] = useState('$')
  const [rate, setRate] = useState(1)
  const [loading, setLoading] = useState(true)

  // Auto-detect currency on first load
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // Get country code
        console.log('Detecting currency...');
        const res = await fetch('https://ipapi.co/json/')
        const data = await res.json()
        const country = data.country_code
        const detected = countryToCurrency[country] || 'USD'
        console.log(`Detected country: ${country}, setting currency to: ${detected}`);
        setCurrency(detected)
      } catch (err) {
        console.error('Currency detection failed:', err);
        setCurrency('USD')
      }
    }
    detectCurrency()
  }, [])

  // Fetch exchange rate when currency changes
  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true)
      console.log(`Fetching rate for currency: ${currency}`);
      try {
        if (currency === 'USD') {
          setRate(1)
          setSymbol('$')
          console.log('Set currency to USD, rate: 1');
        } else {
          const res = await fetch(`https://api.exchangerate.host/latest?base=USD&symbols=${currency}`)
          const data = await res.json()
          const newRate = data.rates[currency] || 1;
          const newSymbol = currencySymbols[currency] || currency;
          setRate(newRate)
          setSymbol(newSymbol)
          console.log(`Fetched new rate: ${newRate}, symbol: ${newSymbol}`);
        }
      } catch (err) {
        console.error('Failed to fetch exchange rate:', err);
        setRate(1)
        setSymbol('$')
      } finally {
        setLoading(false)
      }
    }
    fetchRate()
  }, [currency])

  return (
    <CurrencyContext.Provider value={{ currency, symbol, rate, setCurrency, loading }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext) 