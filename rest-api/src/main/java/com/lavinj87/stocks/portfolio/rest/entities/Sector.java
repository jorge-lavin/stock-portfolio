package com.lavinj87.stocks.portfolio.rest.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity public class Sector
{
	private int sectorId;
	private String name;
	private Collection<Stock> stocksBySectorId;

	private Sector() {}

	public Sector(int sectorId, String name) {
		this.sectorId = sectorId;
		this.name = name;
	}

	@Id @Column(name = "SectorId", nullable = false) public int getSectorId()
	{
		return sectorId;
	}

	public void setSectorId(int sectorId)
	{
		this.sectorId = sectorId;
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
		if (!(obj instanceof Sector))
			return false;

		Sector other = (Sector) obj;
		return Objects.equals(sectorId, other.sectorId) && Objects.equals(name, other.name);
	}

	@Override public int hashCode()
	{
		return Objects.hash(sectorId, name);
	}

	@Override
	public String toString() {
		return String.format("<Sector sectorId:%d, name:%s>", sectorId, name);
	}

	@OneToMany(mappedBy = "sectorBySectorId")
	@JsonIgnore
	public Collection<Stock> getStocksBySectorId()
	{
		return stocksBySectorId;
	}

	public void setStocksBySectorId(Collection<Stock> stocksBySectorId)
	{
		this.stocksBySectorId = stocksBySectorId;
	}
}
