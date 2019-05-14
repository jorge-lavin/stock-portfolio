CREATE TABLE [dbo].[Currency]
(
	[CurrencyId]  VARCHAR(3)  PRIMARY KEY  NOT NULL,
	[Name]        NVARCHAR(50) NOT NULL
)

GO

CREATE INDEX [IX_Currency_CurrencyId] ON [dbo].[Currency] ([CurrencyId])