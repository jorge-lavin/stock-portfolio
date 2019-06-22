export async function fetchStocks()  {
  const res = await fetch("/api/v1/stocks/")
  const data = await  res.json()
  return data
}

export async function fetchDividends(stockId) {
  const res = await fetch (`/api/v1/stocks/${stockId}/dividends/`)
  const data = await res.json()
  return data
}

