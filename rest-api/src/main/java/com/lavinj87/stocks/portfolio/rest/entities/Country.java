package com.lavinj87.stocks.portfolio.rest.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity public class Country
{
	private String countryId;
	private String name;
	private Collection<Stock> stocksByCountryId;


	private Country() { }

	public Country(String countryId, String name) {
		this.countryId = countryId;
		this.name = name;
	}



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

	@OneToMany(mappedBy = "countryByCountryId")
	@JsonIgnore
	public Collection<Stock> getStocksByCountryId()
	{
		return stocksByCountryId;
	}

	public void setStocksByCountryId(Collection<Stock> stocksByCountryId)
	{
		this.stocksByCountryId = stocksByCountryId;
	}
}
