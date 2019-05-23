package com.lavinj87.stocks.portfolio.restapi;

import com.lavinj87.stocks.portfolio.restapi.entities.Country;
import com.lavinj87.stocks.portfolio.restapi.entities.Dividend;
import com.lavinj87.stocks.portfolio.restapi.entities.Portfolio;
import com.lavinj87.stocks.portfolio.restapi.entities.Sector;
import com.lavinj87.stocks.portfolio.restapi.entities.Stock;
import com.lavinj87.stocks.portfolio.restapi.entities.StockOrder;

public class Main
{
	public static void main(String[] args)
	{
		RestClient client = new RestClient("localhost", 8080);
		client.saveCountry(new Country("ES", "Spain"));
		client.saveSector(new Sector());
		client.saveStock(new Stock());
		client.addDividend("BME:MAP", new Dividend());
		client.savePortfolio(new Portfolio());
		client.addOrder(1, new StockOrder());
	}
}
