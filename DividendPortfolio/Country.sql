﻿CREATE TABLE [dbo].[Country]
(
	[CountryId] VARCHAR(2) NOT NULL PRIMARY KEY,
	[Name]      NVARCHAR(50) NOT NULL
)

GO

CREATE INDEX [IX_Country_CountryId] ON [dbo].[Country] ([CountryId])
