package com.lavinj87.stocks.portfolio.restapi.entities;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity public class Country
{
	private String countryId;
	private String name;
	private Collection<Stock> stocksByCountryId;

	@Id @Column(name = "CountryId", nullable = false, length = 2) public String getCountryId()
	{
		return countryId;
	}

	public void setCountryId(String countryId)
	{
		this.countryId = countryId;
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
		if (!(obj instanceof Country))
			return false;

		Country other = (Country) obj;
		return Objects.equals(countryId, other.countryId) && Objects.equals(name, other.name);
	}

	@Override public int hashCode()
	{
		return Objects.hash(countryId, name);
	}

	@OneToMany(mappedBy = "countryByCountryId") public Collection<Stock> getStocksByCountryId()
	{
		return stocksByCountryId;
	}

	public void setStocksByCountryId(Collection<Stock> stocksByCountryId)
	{
		this.stocksByCountryId = stocksByCountryId;
	}
}
