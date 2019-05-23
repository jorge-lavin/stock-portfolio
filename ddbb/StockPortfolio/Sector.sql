CREATE TABLE [dbo].[Sector]
(
	[SectorId] INT NOT NULL PRIMARY KEY,
	[Name]     VARCHAR(64) NOT NULL
)

GO

CREATE INDEX [IX_Sector_SectorId] ON [dbo].[Sector] ([SectorId])
