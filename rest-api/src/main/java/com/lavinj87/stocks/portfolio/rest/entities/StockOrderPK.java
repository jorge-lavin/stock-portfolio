package com.lavinj87.stocks.portfolio.rest.entities;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;

public class StockOrderPK implements Serializable
{
	private int portfolioId;
	private String stockId;
	private Date orderDate;

	@Column(name = "PortfolioId", nullable = false) @Id public int getPortfolioId()
	{
		return portfolioId;
	}

	public void setPortfolioId(int portfolioId)
	{
		this.portfolioId = portfolioId;
	}

	@Column(name = "StockId", nullable = false, length = 16) @Id public String getStockId()
	{
		return stockId;
	}

	public void setStockId(String stockId)
	{
		this.stockId = stockId;
	}

	@Column(name = "OrderDate", nullable = false) @Id public Date getOrderDate()
	{
		return orderDate;
	}

	public void setOrderDate(Date orderDate)
	{
		this.orderDate = orderDate;
	}

	@Override public boolean equals(Object obj)
	{
		if (obj == this)
			return true;
		if (!(obj instanceof StockOrderPK))
			return false;

		StockOrderPK other = (StockOrderPK) obj;
		return Objects.equals(portfolioId, other.portfolioId) && Objects.equals(stockId, other.stockId) && Objects.equals(orderDate, other.orderDate);
	}

	@Override public int hashCode()
	{
		return Objects.hash(portfolioId, stockId, orderDate);
	}
}
