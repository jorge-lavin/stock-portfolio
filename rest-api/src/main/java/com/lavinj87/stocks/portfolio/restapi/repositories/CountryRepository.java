package com.lavinj87.stocks.portfolio.restapi.repositories;

import com.lavinj87.stocks.portfolio.restapi.entities.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, String>
{
}
