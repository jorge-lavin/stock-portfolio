package com.lavinj87.stocks.portfolio.rest.controllers;

import com.lavinj87.stocks.portfolio.rest.entities.Dividend;
import com.lavinj87.stocks.portfolio.rest.entities.Stock;
import com.lavinj87.stocks.portfolio.rest.repositories.DividendRepository;
import com.lavinj87.stocks.portfolio.rest.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/stocks/")
public class StockController
{
	private final StockRepository stockRepository;
	private final DividendRepository dividendRepository;

	@Autowired
	public StockController(StockRepository stockRepository, DividendRepository dividendRepository) {
		this.stockRepository = stockRepository;
		this.dividendRepository = dividendRepository;
	}

	@GetMapping
	public List<Stock> findStocks() {
		return stockRepository.findAll();
	}

	@GetMapping("/{stockId}")
	public Stock findStockById(@PathVariable String stockId) {
		return stockRepository.findById(stockId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find stock with id " + stockId));
	}

	@PostMapping("/{stockId}")
	public Stock saveStock(@PathVariable String stockId, @RequestBody Stock stock) {
		stock.setStockId(stockId);
		return stockRepository.save(stock);
	}

	@DeleteMapping("/{stockId}")
	public void deleteStock(@PathVariable String stockId) {
		stockRepository.deleteById(stockId);
	}

	@PostMapping("/{stockId}/dividends/")
	public Dividend addDividend(@PathVariable String stockId, @RequestBody Dividend dividend) {
		dividend.setStockId(stockId);
		return dividendRepository.save(dividend);
	}

	@GetMapping("/{stockId}/dividends/")
	public Collection<Dividend> findDividendsByStockId(@PathVariable String stockId) {
		return stockRepository.findById(stockId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find stock with id " + stockId)).getDividendsByStockId();
	}
}
