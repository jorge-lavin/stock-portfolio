package com.lavinj87.stocks.portfolio.restapi.repositories;

import com.lavinj87.stocks.portfolio.restapi.entities.Dividend;
import com.lavinj87.stocks.portfolio.restapi.entities.DividendPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DividendRepository extends JpaRepository<Dividend, DividendPK>
{
}
