package com.lavinj87.stocks.portfolio.rest.repositories;

import com.lavinj87.stocks.portfolio.rest.entities.Dividend;
import com.lavinj87.stocks.portfolio.rest.entities.DividendPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DividendRepository extends JpaRepository<Dividend, DividendPK>
{
}
