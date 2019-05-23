package com.lavinj87.stocks.portfolio.restapi.controllers;


import com.lavinj87.stocks.portfolio.restapi.entities.Portfolio;
import com.lavinj87.stocks.portfolio.restapi.repositories.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/portfolios/")
public class PortfolioController {

	private final PortfolioRepository repository;

	@Autowired
	public PortfolioController(PortfolioRepository repository) {
		this.repository = repository;
	}

	@RequestMapping("/{portfolioId}")
	public Portfolio getPortfolioById(@PathVariable int portfolioId) {
		return repository.getOne(portfolioId);
	}
}