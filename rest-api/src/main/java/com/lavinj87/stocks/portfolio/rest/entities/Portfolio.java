package com.lavinj87.stocks.portfolio.rest.entities;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity public class Portfolio
{
	private int portfolioId;
	private String name;
	private Collection<StockOrder> stockOrdersByPortfolioId;

	private Portfolio() {}

	public Portfolio(int portfolioId, String name) {
		this.portfolioId = portfolioId;
		this.name = name;
	}

	@Id @Column(name = "PortfolioId", nullable = false) public int getPortfolioId()
	{
		return portfolioId;
	}

	public void setPortfolioId(int portfolioId)
	{
		this.portfolioId = portfolioId;
	}

	@Basic @Column(name = "Name", nullable = false, length = 64) public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	@Override public boolean equals(Object obj)
	{
		if (obj == this)
			return true;
		if (!(obj instanceof Portfolio))
			return false;

		Portfolio other = (Portfolio) obj;
		return Objects.equals(portfolioId, other.portfolioId) && Objects.equals(name, other.name);
	}

	@Override public int hashCode()
	{
		return Objects.hash(portfolioId, name);
	}

	@OneToMany(mappedBy = "portfolioByPortfolioId") public Collection<StockOrder> getStockOrdersByPortfolioId()
	{
		return stockOrdersByPortfolioId;
	}

	public void setStockOrdersByPortfolioId(Collection<StockOrder> stockOrdersByPortfolioId)
	{
		this.stockOrdersByPortfolioId = stockOrdersByPortfolioId;
	}
}
