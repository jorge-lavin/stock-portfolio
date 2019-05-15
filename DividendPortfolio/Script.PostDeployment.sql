/*
Plantilla de script posterior a la implementación							
--------------------------------------------------------------------------------------
 Este archivo contiene instrucciones de SQL que se anexarán al script de compilación.		
 Use la sintaxis de SQLCMD para incluir un archivo en el script posterior a la implementación.			
 Ejemplo:      :r .\miArchivo.sql								
 Use la sintaxis de SQLCMD para hacer referencia a una variable en el script posterior a la implementación.		
 Ejemplo:      :setvar TableName miTabla							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

IF NOT(EXISTS(SELECT TOP 1 * FROM OrderType))
BEGIN
	INSERT INTO OrderType VALUES(1, 'Buy')
	INSERT INTO OrderType VALUES(2, 'Sell')
END


BEGIN TRAN
	DELETE FROM OrderLog
	DELETE FROM Portfolio
	DELETE FROM Dividend
	DELETE FROM Stock
	DELETE FROM Sector
	DELETE FROM Country
	DELETE FROM Currency

	-- Currency
	INSERT INTO Currency VALUES('EUR', 'Euro')
	INSERT INTO Currency VALUES('USD', 'United States Dollar')
	-- Fin de Currency

	-- Sector
	INSERT INTO Sector VALUES(1, 'Servicios Publicos')
	INSERT INTO Sector VALUES(2, 'Servicios Financieros')
	INSERT INTO Sector VALUES(3, 'Consumo Defensivo')
	INSERT INTO Sector VALUES(4, 'Consumo Cíclico')
	-- Fin de Sector

	-- Country
	INSERT INTO Country VALUES('ES', 'España')
	INSERT INTO Country VALUES('US', 'United States of America')
	-- Fin de Country

	:r .\PostDeployment\BME-ENG.sql
	:r .\PostDeployment\BME-ITX.sql
	:r .\PostDeployment\BME-MAP.sql
	:r .\PostDeployment\BME-NTGY.sql
	:r .\PostDeployment\BME-REE.sql
	:r .\PostDeployment\BME-VIS.sql
	:r .\PostDeployment\NYSE-DIS.sql

COMMIT
