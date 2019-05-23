package com.lavinj87.stocks.portfolio.restapi.controllers;


import com.lavinj87.stocks.portfolio.restapi.entities.Portfolio;
import com.lavinj87.stocks.portfolio.restapi.entities.Stock;
import com.lavinj87.stocks.portfolio.restapi.entities.StockOrder;
import com.lavinj87.stocks.portfolio.restapi.repositories.PortfolioRepository;
import com.lavinj87.stocks.portfolio.restapi.repositories.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/portfolios/")
public class PortfolioController {

	private final PortfolioRepository portfolioRepository;
	private final StockRepository     stockRepository;

	@Autowired
	public PortfolioController(PortfolioRepository portfolioRepository, StockRepository stockRepository) {
		this.portfolioRepository = portfolioRepository;
		this.stockRepository = stockRepository;
	}

	@GetMapping("/{portfolioId}")
	public Portfolio findPortfolioById(@PathVariable int portfolioId) {
		return portfolioRepository.findById(portfolioId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find portfolio with id " + portfolioId));
	}

	@PostMapping("/{portfolioId}")
	public Portfolio savePortfolio(@PathVariable int portfolioId, @RequestBody Portfolio portfolio) {
		return portfolioRepository.save(portfolio);
	}

	@DeleteMapping
	public void deletePortfolioById(@PathVariable int portfolioId) {
		portfolioRepository.deleteById(portfolioId);
	}

	@PostMapping("/{portfolioId}/stocks/{stockId}/")
	public Portfolio addOrder(@PathVariable int portfolioId, @PathVariable String stockId, @RequestBody StockOrder stockOrder) {
		Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find portfolio with id " + portfolioId));
		Stock stock = stockRepository.findById(stockId).orElseThrow(() ->  new ResponseStatusException(NOT_FOUND, "Unable to find stock with id " + stockId));

		stockOrder.setStockByStockId(stock);
		stockOrder.setPortfolioByPortfolioId(portfolio);

		stock.getStockOrdersByStockId().add(stockOrder);
		portfolio.getStockOrdersByPortfolioId().add(stockOrder);

		stockRepository.save(stock);
		return portfolioRepository.save(portfolio);
	}

}