CREATE TABLE [dbo].[OrderLog]
(
	[PortfolioId]  INT         NOT NULL,
	[StockId]      VARCHAR(50) NOT NULL,
	[OrderTypeId]  SMALLINT    NOT NULL,
	[StockCount]   INT         NOT NULL,
	[Date]         DATE    NOT NULL DEFAULT GETDATE(),
	CONSTRAINT [PK_OrderLog]            PRIMARY KEY ([PortfolioId],[StockId],[OrderTypeId],[Date]), 
	CONSTRAINT [FK_OrderLog_Portfolio]  FOREIGN KEY ([PortfolioId]) REFERENCES [Portfolio]([PortfolioId]),
    CONSTRAINT [FK_OrderLog_Stock]      FOREIGN KEY ([StockId])     REFERENCES [Stock]([StockId]),
	CONSTRAINT [FK_OrderLog_OrderType]  FOREIGN KEY ([OrderTypeId]) REFERENCES [OrderType]([OrderTypeId]), 
    CONSTRAINT [CK_OrderLog_StockCount] CHECK (StockCount > 0)
)
GO

CREATE INDEX [IX_OrderLog_PortfolioId] ON [dbo].[OrderLog] ([PortfolioId])
