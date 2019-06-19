export async function fetchStocks()  {
  const res = await fetch("/api/v1/stocks/")
  const data = await  res.json()
  return data
}

