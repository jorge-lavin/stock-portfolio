package com.lavinj87.stocks.portfolio.rest.repositories;

import com.lavinj87.stocks.portfolio.rest.entities.Sector;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectorRepository extends JpaRepository<Sector, Integer>
{
}
