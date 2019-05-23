package com.lavinj87.stocks.portfolio.rest.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity public class Currency
{
	private String currencyId;
	private String name;
	private Collection<Dividend> dividendsByCurrencyId;

	private Currency() {}

	public Currency(String currencyId, String name) {
		this.currencyId = currencyId;
		this.name = name;
	}
	@Id @Column(name = "CurrencyId", nullable = false, length = 3) public String getCurrencyId()
	{
		return currencyId;
	}

	public void setCurrencyId(String currencyId)
	{
		this.currencyId = currencyId;
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
		if (!(obj instanceof Currency))
			return false;

		Currency other = (Currency) obj;
		return Objects.equals(currencyId, other.currencyId) && Objects.equals(name, other.name);
	}

	@Override public int hashCode()
	{
		return Objects.hash(currencyId, name);
	}

	@OneToMany(mappedBy = "currencyByCurrencyId")
	@JsonIgnore
	public Collection<Dividend> getDividendsByCurrencyId()
	{
		return dividendsByCurrencyId;
	}

	public void setDividendsByCurrencyId(Collection<Dividend> dividendsByCurrencyId)
	{
		this.dividendsByCurrencyId = dividendsByCurrencyId;
	}
}
