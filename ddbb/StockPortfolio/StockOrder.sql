CREATE TABLE [dbo].[StockOrder]
(
	[PortfolioId] INT         NOT NULL,
	[StockId]     VARCHAR(16) NOT NULL,
	[Amount]      INT         NOT NULL,
	[OrderDate]   DATE        NOT NULL, 
    CONSTRAINT [PK_StockOrder] PRIMARY KEY ([PortfolioId], [StockId], [OrderDate]), 
    CONSTRAINT [FK_StockOrder_Portfolio] FOREIGN KEY ([PortfolioId]) REFERENCES [Portfolio]([PortfolioId]), 
	CONSTRAINT [FK_StockOrder_Stock] FOREIGN KEY ([StockId]) REFERENCES [Stock]([StockId])
)

GO

CREATE INDEX [IX_StockOrder_PortfolioId] ON [dbo].[StockOrder] ([PortfolioId])