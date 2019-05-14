CREATE TABLE [dbo].[Stock]
(
	[StockId]   VARCHAR(50) NOT NULL PRIMARY KEY,
 	[SectorId]  INT         NOT NULL, 
	[CountryId] VARCHAR(2)  NOT NULL,
    CONSTRAINT [FK_Stock_Sector]  FOREIGN KEY ([SectorId])  REFERENCES [Sector]([SectorId]),
	CONSTRAINT [FK_Stock_Country] FOREIGN KEY ([CountryId]) REFERENCES [Country]([CountryId])
)

GO

CREATE INDEX [IX_Stock_StockId] ON [dbo].[Stock] ([StockId])
