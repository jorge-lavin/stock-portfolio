package com.lavinj87.stocks.portfolio.restapi.controllers;


import com.lavinj87.stocks.portfolio.restapi.entities.Portfolio;
import com.lavinj87.stocks.portfolio.restapi.repositories.PortfolioRepository;
import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/portfolios/")
public class PortfolioController {

	private final PortfolioRepository repository;

	@Autowired
	public PortfolioController(PortfolioRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/{portfolioId}")
	public Portfolio findPortfolioById(@PathVariable int portfolioId) {
		return repository.findById(portfolioId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find portfolio with id " + portfolioId));
	}

	@PostMapping("/{portfolioId}")
	public Portfolio savePortfolio(@PathVariable int portfolioId, @RequestBody Portfolio portfolio) {
		return repository.save(portfolio);
	}

	@PutMapping("/{portfolioId}")
	public Portfolio updatePortfolio(@PathVariable int portfolioId, @RequestBody Portfolio updateDetails) {
		Portfolio found = repository.findById(portfolioId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find portfolio with id " + portfolioId));
		found.setName(updateDetails.getName());
		found.setStockOrdersByPortfolioId(updateDetails.getStockOrdersByPortfolioId());
		return repository.save(found);
	}

	@DeleteMapping
	public void deletePortfolioById(@PathVariable int portfolioId) {
		repository.deleteById(portfolioId);
	}
}