package com.lavinj87.stocks.portfolio.rest.controllers;


import com.lavinj87.stocks.portfolio.rest.entities.Portfolio;
import com.lavinj87.stocks.portfolio.rest.entities.Stock;
import com.lavinj87.stocks.portfolio.rest.entities.StockOrder;
import com.lavinj87.stocks.portfolio.rest.repositories.PortfolioRepository;
import com.lavinj87.stocks.portfolio.rest.repositories.StockOrderRepository;
import com.lavinj87.stocks.portfolio.rest.repositories.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/portfolios/")
public class PortfolioController {

	private final PortfolioRepository  portfolioRepository;
	private final StockOrderRepository stockOrderRepository;

	@Autowired
	public PortfolioController(PortfolioRepository portfolioRepository, StockOrderRepository stockOrderRepository) {
		this.portfolioRepository  = portfolioRepository;
		this.stockOrderRepository = stockOrderRepository;
	}

	@GetMapping
	public List<Portfolio> findPortfolios() {
		return portfolioRepository.findAll();
	}

	@GetMapping("/{portfolioId}")
	public Portfolio findPortfolioById(@PathVariable int portfolioId) {
		return portfolioRepository.findById(portfolioId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find portfolio with id " + portfolioId));
	}

	@PostMapping("/{portfolioId}")
	public Portfolio savePortfolio(@PathVariable int portfolioId, @RequestBody Portfolio portfolio) {
		portfolio.setPortfolioId(portfolioId);
		return portfolioRepository.save(portfolio);
	}

	@DeleteMapping
	public void deletePortfolioById(@PathVariable int portfolioId) {
		portfolioRepository.deleteById(portfolioId);
	}

	@PostMapping("/{portfolioId}/stocks/{stockId}/")
	public StockOrder addOrder(@PathVariable int portfolioId, @PathVariable String stockId, @RequestBody StockOrder stockOrder) {
		stockOrder.setStockId(stockId);
		stockOrder.setPortfolioId(portfolioId);

		//stockRepository.save(stock);
		return stockOrderRepository.save(stockOrder);
	}

}