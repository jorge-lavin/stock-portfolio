package com.lavinj87.stocks.portfolio.restapi.controllers;

import com.lavinj87.stocks.portfolio.restapi.entities.Dividend;
import com.lavinj87.stocks.portfolio.restapi.entities.Stock;
import com.lavinj87.stocks.portfolio.restapi.repositories.DividendRepository;
import com.lavinj87.stocks.portfolio.restapi.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
		Stock stock = stockRepository.findById(stockId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find stock with id " + stockId));

		dividend.setStockByStockId(stock);
		stock.getDividendsByStockId().add(dividend);

		stockRepository.save(stock);
		return dividendRepository.save(dividend);
	}
}
