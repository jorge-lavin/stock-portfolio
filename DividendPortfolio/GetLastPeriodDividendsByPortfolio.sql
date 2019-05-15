/**
  Devuelve los dividendos del ultimo periodo para todas las acciones de una cartera.
**/
CREATE PROCEDURE [dbo].[GetLastPeriodDividendsByPortfolio]
	@PortfolioId int 
AS
	-- Sumamos los dividendos de cada stock para todos los periodos y nos quedamos con el mas reciente (rn = 1)
	WITH d AS (
		SELECT 
			Amount, CurrencyId, StockId 
		FROM (
			SELECT 
				SUM(Amount) AS Amount, CurrencyId, Period, StockId, 
				ROW_NUMBER() OVER(PARTITION BY stockId ORDER BY Period DESC) AS rn
			FROM Dividend
			GROUP BY CurrencyId, Period, StockId
		) anon WHERE rn = 1
	), 
	-- Sumamos las órdenes para cada Stock y Portfolio
	o AS ( 
		SELECT 
			PortfolioId, 
			StockId, 
			SUM(CASE WHEN OrderTypeId = 1 THEN StockCount ELSE -1 * StockCount END) AS Stocks
		FROM OrderLog 
		GROUP BY PortfolioId, StockId	
	)
	-- Join e ya
	SELECT 
		o.PortfolioId, o.StockId, o.Stocks, d.Amount, d.CurrencyId
	FROM o 
	INNER JOIN d ON d.StockId = o.StockId
	WHERE o.PortfolioId = @PortfolioId

RETURN 0
