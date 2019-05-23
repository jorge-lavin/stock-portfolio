package com.lavinj87.stocks.portfolio.restapi.controllers;

import com.lavinj87.stocks.portfolio.restapi.entities.Stock;
import com.lavinj87.stocks.portfolio.restapi.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/stocks/")
public class StockController
{
	private final StockRepository repository;

	@Autowired
	public StockController(StockRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/{stockId}")
	public Stock findStockById(@PathVariable String stockId) {
		return repository.findById(stockId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find stock with id " + stockId));
	}

	@PostMapping("/{stockId}")
	public Stock saveStock(@PathVariable String stockId, @RequestBody Stock stock) {
		stock.setStockId(stockId);
		return repository.save(stock);
	}

	@DeleteMapping("/{stockId}")
	public void deleteStock(@PathVariable String stockId) {
		repository.deleteById(stockId);
	}

}
