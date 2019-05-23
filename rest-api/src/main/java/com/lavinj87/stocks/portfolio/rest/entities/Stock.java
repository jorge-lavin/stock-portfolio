package com.lavinj87.stocks.portfolio.rest.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity public class Stock
{
	private String stockId;
	private int sectorId;
	private String countryId;
	private Collection<Dividend> dividendsByStockId;
	private Sector sectorBySectorId;
	private Country countryByCountryId;
	private Collection<StockOrder> stockOrdersByStockId;

	private Stock() {}

	public Stock(String stockId, int sectorId, String countryId ) {
		this.stockId = stockId;
		this.sectorId = sectorId;
		this.countryId = countryId;
	}

	@Id @Column(name = "StockId", nullable = false, length = 16) public String getStockId()
	{
		return stockId;
	}

	public void setStockId(String stockId)
	{
		this.stockId = stockId;
	}

	@Basic @Column(name = "SectorId", nullable = false) public int getSectorId()
	{
		return sectorId;
	}

	public void setSectorId(int sectorId)
	{
		this.sectorId = sectorId;
	}

	@Basic @Column(name = "CountryId", nullable = false, length = 2) public String getCountryId()
	{
		return countryId;
	}

	public void setCountryId(String countryId)
	{
		this.countryId = countryId;
	}

	@Override public boolean equals(Object obj)
	{
		if (obj == this)
			return true;
		if (!(obj instanceof Stock))
			return false;

		Stock other = (Stock) obj;
		return Objects.equals(sectorId, other.sectorId) && Objects.equals(stockId, other.stockId) && Objects.equals(countryId, other.countryId);
	}

	@Override public int hashCode()
	{
		return Objects.hash(stockId, sectorId, countryId);
	}

	@OneToMany(mappedBy = "stockByStockId") public Collection<Dividend> getDividendsByStockId()
	{
		return dividendsByStockId;
	}

	public void setDividendsByStockId(Collection<Dividend> dividendsByStockId)
	{
		this.dividendsByStockId = dividendsByStockId;
	}

	@ManyToOne @JoinColumn(name = "SectorId", referencedColumnName = "SectorId", nullable = false,  insertable = false, updatable = false) public Sector getSectorBySectorId()
	{
		return sectorBySectorId;
	}

	public void setSectorBySectorId(Sector sectorBySectorId)
	{
		this.sectorBySectorId = sectorBySectorId;
	}

	@ManyToOne @JoinColumn(name = "CountryId", referencedColumnName = "CountryId", nullable = false,  insertable = false, updatable = false) public Country getCountryByCountryId()
	{
		return countryByCountryId;
	}

	public void setCountryByCountryId(Country countryByCountryId)
	{
		this.countryByCountryId = countryByCountryId;
	}

	@OneToMany(mappedBy = "stockByStockId")
	@JsonIgnore
	public Collection<StockOrder> getStockOrdersByStockId()
	{
		return stockOrdersByStockId;
	}

	public void setStockOrdersByStockId(Collection<StockOrder> stockOrdersByStockId)
	{
		this.stockOrdersByStockId = stockOrdersByStockId;
	}
}
