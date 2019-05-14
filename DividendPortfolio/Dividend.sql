CREATE TABLE [dbo].[Dividend]
(
	[StockId]    VARCHAR(50)  NOT NULL,
	[Date]       DATE         NOT NULL,
	[Period]     SMALLINT     NOT NULL,
	[Amount]     DECIMAL(5,4) NOT NULL,
	[CurrencyId] VARCHAR(3)  NOT NULL,
    CONSTRAINT [FK_Dividend_Stock]    FOREIGN KEY ([StockId])        REFERENCES [Stock]([StockId]),
	CONSTRAINT [FK_Dividend_Currency] FOREIGN KEY ([CurrencyId])     REFERENCES [Currency]([CurrencyId]), 
    CONSTRAINT [PK_Dividend]          PRIMARY KEY ([StockId],[Date]), 
    CONSTRAINT [CK_Dividend_Amount]   CHECK (Amount > 0)
)
GO

CREATE INDEX [IX_Dividend_StockId] ON [dbo].[Dividend] ([StockId])