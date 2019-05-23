package com.lavinj87.stocks.portfolio.restapi.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Objects;

@Entity @IdClass(DividendPK.class) public class Dividend
{
	private String stockId;
	private Date date;
	private short period;
	private BigDecimal amount;
	private String currencyId;
	private Stock stockByStockId;
	private Currency currencyByCurrencyId;

	@Id @Column(name = "StockId", nullable = false, length = 16) public String getStockId()
	{
		return stockId;
	}

	public void setStockId(String stockId)
	{
		this.stockId = stockId;
	}

	@Id @Column(name = "Date", nullable = false) public Date getDate()
	{
		return date;
	}

	public void setDate(Date date)
	{
		this.date = date;
	}

	@Basic @Column(name = "Period", nullable = false) public short getPeriod()
	{
		return period;
	}

	public void setPeriod(short period)
	{
		this.period = period;
	}

	@Basic @Column(name = "Amount", nullable = false, precision = 4) public BigDecimal getAmount()
	{
		return amount;
	}

	public void setAmount(BigDecimal amount)
	{
		this.amount = amount;
	}

	@Basic @Column(name = "CurrencyId", nullable = false, length = 3) public String getCurrencyId()
	{
		return currencyId;
	}

	public void setCurrencyId(String currencyId)
	{
		this.currencyId = currencyId;
	}

	@Override public boolean equals(Object obj)
	{
		if (obj == this)
			return true;
		if (!(obj instanceof Dividend))
			return false;

		Dividend other = (Dividend) obj;
		return Objects.equals(period, other.period) && Objects.equals(stockId, other.stockId) && Objects.equals(date, other.date) && Objects
				.equals(amount, other.amount) && Objects.equals(currencyId, other.currencyId);
	}

	@Override public int hashCode()
	{
		return Objects.hash(stockId, date, period, amount, currencyId);
	}

	@ManyToOne @JoinColumn(name = "StockId", referencedColumnName = "StockId", nullable = false) public Stock getStockByStockId()
	{
		return stockByStockId;
	}

	public void setStockByStockId(Stock stockByStockId)
	{
		this.stockByStockId = stockByStockId;
	}

	@ManyToOne @JoinColumn(name = "CurrencyId", referencedColumnName = "CurrencyId", nullable = false) public Currency getCurrencyByCurrencyId()
	{
		return currencyByCurrencyId;
	}

	public void setCurrencyByCurrencyId(Currency currencyByCurrencyId)
	{
		this.currencyByCurrencyId = currencyByCurrencyId;
	}
}
