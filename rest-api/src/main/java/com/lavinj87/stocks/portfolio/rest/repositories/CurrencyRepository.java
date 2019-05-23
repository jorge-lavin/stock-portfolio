package com.lavinj87.stocks.portfolio.rest.repositories;

import com.lavinj87.stocks.portfolio.rest.entities.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepository extends JpaRepository<Currency, String>
{
}