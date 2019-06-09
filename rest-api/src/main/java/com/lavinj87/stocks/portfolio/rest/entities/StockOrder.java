package com.lavinj87.stocks.portfolio.rest.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity @IdClass(StockOrderPK.class) public class StockOrder
{
	private int portfolioId;
	private String stockId;
	private int amount;
	private Date orderDate;
	private Portfolio portfolioByPortfolioId;
	private Stock stockByStockId;

	private StockOrder() {}

	public StockOrder(int amount, Date orderDate) {
		this.amount = amount;
		this.orderDate = orderDate;
	}

	@Id
	@Column(name = "PortfolioId", nullable = false)
	public int getPortfolioId()
	{
		return portfolioId;
	}

	public void setPortfolioId(int portfolioId)
	{
		this.portfolioId = portfolioId;
	}

	@Id
	@Column(name = "StockId", nullable = false, length = 16)
	public String getStockId()
	{
		return stockId;
	}

	public void setStockId(String stockId)
	{
		this.stockId = stockId;
	}

	@Basic @Column(name = "Amount", nullable = false) public int getAmount()
	{
		return amount;
	}

	public void setAmount(int amount)
	{
		this.amount = amount;
	}

	@Id @Column(name = "OrderDate", nullable = false) public Date getOrderDate()
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
		if (!(obj instanceof StockOrder))
			return false;

		StockOrder other = (StockOrder) obj;
		return Objects.equals(portfolioId, other.portfolioId) && Objects.equals(amount, other.amount) && Objects.equals(stockId, other.stockId)
				&& Objects.equals(orderDate, other.orderDate);
	}

	@Override public int hashCode()
	{
		return Objects.hash(portfolioId, stockId, amount, orderDate);
	}

	@ManyToOne
	@JoinColumn(name = "PortfolioId", referencedColumnName = "PortfolioId", nullable = false, insertable = false, updatable = false)
	@JsonIgnore
	public Portfolio getPortfolioByPortfolioId()
	{
		return portfolioByPortfolioId;
	}

	public void setPortfolioByPortfolioId(Portfolio portfolioByPortfolioId)
	{
		this.portfolioByPortfolioId = portfolioByPortfolioId;
	}

	@ManyToOne
	@JoinColumn(name = "StockId", referencedColumnName = "StockId", nullable = false,  insertable = false, updatable = false)
	@JsonIgnore
	public Stock getStockByStockId()
	{
		return stockByStockId;
	}

	public void setStockByStockId(Stock stockByStockId)
	{
		this.stockByStockId = stockByStockId;
	}
}
