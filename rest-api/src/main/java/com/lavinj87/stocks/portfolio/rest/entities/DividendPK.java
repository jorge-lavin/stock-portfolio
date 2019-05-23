package com.lavinj87.stocks.portfolio.rest.entities;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;

public class DividendPK implements Serializable
{
	private String stockId;
	private Date date;

	@Column(name = "StockId", nullable = false, length = 16) @Id public String getStockId()
	{
		return stockId;
	}

	public void setStockId(String stockId)
	{
		this.stockId = stockId;
	}

	@Column(name = "Date", nullable = false) @Id public Date getDate()
	{
		return date;
	}

	public void setDate(Date date)
	{
		this.date = date;
	}

	@Override public boolean equals(Object obj)
	{
		if (obj == this)
			return true;
		if (!(obj instanceof DividendPK))
			return false;

		DividendPK other = (DividendPK) obj;
		return Objects.equals(stockId, other.stockId) && Objects.equals(date, other.date);
	}

	@Override public int hashCode()
	{
		return Objects.hash(stockId, date);
	}
}
