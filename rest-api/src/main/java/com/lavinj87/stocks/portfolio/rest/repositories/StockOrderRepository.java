package com.lavinj87.stocks.portfolio.rest.repositories;

import com.lavinj87.stocks.portfolio.rest.entities.StockOrder;
import com.lavinj87.stocks.portfolio.rest.entities.StockOrderPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockOrderRepository extends JpaRepository<StockOrder, StockOrderPK> {
}
