package com.lavinj87.stocks.portfolio.rest.repositories;

import com.lavinj87.stocks.portfolio.rest.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, String>
{
}
