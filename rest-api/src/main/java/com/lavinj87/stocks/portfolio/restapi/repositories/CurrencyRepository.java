package com.lavinj87.stocks.portfolio.restapi.repositories;

import com.lavinj87.stocks.portfolio.restapi.entities.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepository extends JpaRepository<Currency, String>
{
}