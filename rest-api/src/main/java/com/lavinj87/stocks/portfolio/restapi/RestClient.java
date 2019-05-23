package com.lavinj87.stocks.portfolio.restapi;

import com.lavinj87.stocks.portfolio.restapi.entities.Country;
import com.lavinj87.stocks.portfolio.restapi.entities.Currency;
import com.lavinj87.stocks.portfolio.restapi.entities.Dividend;
import com.lavinj87.stocks.portfolio.restapi.entities.Portfolio;
import com.lavinj87.stocks.portfolio.restapi.entities.Sector;
import com.lavinj87.stocks.portfolio.restapi.entities.Stock;
import com.lavinj87.stocks.portfolio.restapi.entities.StockOrder;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;


import java.util.List;
import java.util.StringJoiner;

public class RestClient {
	private final String baseUrl;
	private final RestTemplate restTemplate;

	public RestClient(String baseUrl, RestTemplate restTemplate) {
		this.baseUrl = baseUrl;
		this.restTemplate = restTemplate;
	}

	public RestClient(String host, Integer port) {
		this("http;//" + host + ":" + port + "/", new RestTemplate());
	}

	public List<Country> findCountries() {
		return restTemplate.exchange(composeUrl("countries"), HttpMethod.GET, null, new ParameterizedTypeReference<List<Country>>(){}).getBody();
	}

	public Country findCountryById(String countryId) {
		return restTemplate.getForEntity(composeUrl("countries", countryId), Country.class).getBody();
	}

	public Country saveCountry(Country country) {
		return restTemplate.postForObject(composeUrl("countries", country.getCountryId()), country, Country.class);
	}

	public void deleteCountry(String countryId) {
		restTemplate.delete(composeUrl("countries", countryId));
	}

	public List<Currency> findCurrencies() {
		return restTemplate.exchange(composeUrl("currencies"), HttpMethod.GET, null, new ParameterizedTypeReference<List<Currency>>(){}).getBody();
	}

	public Currency findCurrencyById(String currencyId) {
		return restTemplate.getForEntity(composeUrl("currencies", currencyId), Currency.class).getBody();
	}

	public Currency saveCurrency(Currency currency) {
		return restTemplate.postForObject(composeUrl("currencies", currency.getCurrencyId()), currency, Currency.class);
	}

	public void deleteCurrency(String currencyId) {
		restTemplate.delete(composeUrl("currencies", currencyId));
	}

	public List<Portfolio> findPortfolios() {
		return restTemplate.exchange(composeUrl("portfolios"), HttpMethod.GET, null, new ParameterizedTypeReference<List<Portfolio>>(){}).getBody();
	}

	public Portfolio findPortfolioById(String portfolioId) {
		return restTemplate.getForEntity(composeUrl("portfolios", String.valueOf(portfolioId)), Portfolio.class).getBody();
	}

	public Portfolio savePortfolio(Portfolio portfolio) {
		return restTemplate.postForObject(composeUrl("portfolios", String.valueOf(portfolio.getPortfolioId())), portfolio, Portfolio.class);
	}

	public void deletePortfolio(int portfolioId) {
		restTemplate.delete(composeUrl("portfolios", String.valueOf(portfolioId)));
	}

	public Portfolio addOrder(int portfolioId, StockOrder stockOrder) {
		return restTemplate.postForObject(composeUrl("portfolios", String.valueOf(portfolioId), "stocks", stockOrder.getStockId()), stockOrder, Portfolio.class);
	}

	public List<Sector> findSectors() {
		return restTemplate.exchange(composeUrl("sectors"), HttpMethod.GET, null, new ParameterizedTypeReference<List<Sector>>(){}).getBody();
	}

	public Sector findSectorById(String sectorId) {
		return restTemplate.getForEntity(composeUrl("sectors", sectorId), Sector.class).getBody();
	}

	public Sector saveSector(Sector sector) {
		return restTemplate.postForObject(composeUrl("sectors", String.valueOf(sector.getSectorId())), sector, Sector.class);
	}

	public void deleteSector(String sectorId) {
		restTemplate.delete(composeUrl("sectors", sectorId));
	}

	public List<Stock> findStocks() {
		return restTemplate.exchange(composeUrl("stocks"), HttpMethod.GET, null, new ParameterizedTypeReference<List<Stock>>(){}).getBody();
	}

	public Stock findStockById(String stockId) {
		return restTemplate.getForEntity(composeUrl("stocks", stockId), Stock.class).getBody();
	}

	public Stock saveStock(Stock stock) {
		return restTemplate.postForObject(composeUrl("stocks", stock.getStockId()), stock, Stock.class);
	}

	public void deleteStock(String stockId) {
		restTemplate.delete(composeUrl("stocks", stockId));
	}

	public Dividend addDividend(String stockId, Dividend dividend) {
		return restTemplate.postForObject(composeUrl("stocks", stockId, "dividends"), dividend, Dividend.class);
	}

	private String composeUrl(String... parts) {
		StringJoiner joiner = new StringJoiner("/").add(baseUrl);
		for (String part: parts) {
			joiner.add(part);
		}
		return joiner.toString();
	}
}
