/** 
	Devuelve la evolución del dividendo de una empresa, ejercicio a ejercicio.
**/

CREATE PROCEDURE [dbo].[DividendByPeriod]
	@StockId VARCHAR(50)
AS
	SELECT 
		Period, 
		SUM(Amount) AS Amount, 
		100 * (SUM(Amount) - (LAG(SUM(Amount), 1) OVER (ORDER BY Period))) / SUM(Amount) AS Change
	FROM [Stocks].[dbo].[Dividend]
	WHERE StockId = @StockId
	GROUP BY StockId, Period
	ORDER BY Period DESC
RETURN 0
