package com.lavinj87.stocks.portfolio.rest;

import com.lavinj87.stocks.portfolio.rest.entities.Country;
import com.lavinj87.stocks.portfolio.rest.entities.Currency;
import com.lavinj87.stocks.portfolio.rest.entities.Dividend;
import com.lavinj87.stocks.portfolio.rest.entities.Portfolio;
import com.lavinj87.stocks.portfolio.rest.entities.Sector;
import com.lavinj87.stocks.portfolio.rest.entities.Stock;
import com.lavinj87.stocks.portfolio.rest.entities.StockOrder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.math.BigDecimal;
import java.sql.Date;


public class Main
{
	private final static Logger logger = LogManager.getLogger(Main.class);

	public static void main(String[] args)
	{
		RestClient client = new RestClient("localhost", 8080);
		client.saveCurrency(new Currency("EUR", "EURO"));
		client.saveCountry(new Country("ES", "Spain"));
		client.saveSector(new Sector(1, "Test"));
		client.saveStock(new Stock("BME:MAP", 1, "ES"));
		client.addDividend("BME:MAP", new Dividend(new Date(123L), (short) 2019, new BigDecimal(2.4d), "EUR"));
		client.savePortfolio(new Portfolio(42, "Test"));
		client.addOrder(42, "BME:MAP", new StockOrder(100, new Date(1L)));

		Portfolio portfolio = client.findPortfolioById(42);
		logger.info("End");
	}
}
