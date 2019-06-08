package com.lavinj87.stocks.portfolio.rest.controllers;

import com.lavinj87.stocks.portfolio.rest.entities.Dividend;
import com.lavinj87.stocks.portfolio.rest.repositories.DividendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dividends/")
public class DividendController {
    private final DividendRepository dividendRepository;

    @Autowired
    public DividendController(DividendRepository dividendRepository) {
        this.dividendRepository = dividendRepository;
    }

    @GetMapping
    public List<Dividend> findDividends() {
        return dividendRepository.findAll();
    }

}


