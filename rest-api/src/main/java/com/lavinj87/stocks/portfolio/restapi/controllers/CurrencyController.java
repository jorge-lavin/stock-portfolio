package com.lavinj87.stocks.portfolio.restapi.controllers;

import com.lavinj87.stocks.portfolio.restapi.entities.Currency;
import com.lavinj87.stocks.portfolio.restapi.repositories.CurrencyRepository;
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
@RequestMapping("/currencies/")
public class CurrencyController {

	private final CurrencyRepository repository;

	@Autowired
	public CurrencyController(CurrencyRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	public List<Currency> findCurrencies() {
		return repository.findAll();
	}

	@GetMapping("/{currencyId}")
	public Currency findCurrencyById(@PathVariable String currencyId) {
		return repository.findById(currencyId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find currency with id " + currencyId));
	}

	@PostMapping("/{currencyId}")
	public Currency saveCurrency(@PathVariable String currencyId, @RequestBody Currency currency) {
		currency.setCurrencyId(currencyId);
		return repository.save(currency);
	}

	@DeleteMapping("/{currencyId}")
	public void deleteCurrency(@PathVariable String currencyId) {
		repository.deleteById(currencyId);
	}
}
