package com.lavinj87.stocks.portfolio.restapi.repositories;

import com.lavinj87.stocks.portfolio.restapi.entities.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Integer>
{
}
