package com.lavinj87.stocks.portfolio.restapi.repositories;

import com.lavinj87.stocks.portfolio.restapi.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, String>
{
}
