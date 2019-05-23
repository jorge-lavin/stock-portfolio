package com.lavinj87.stocks.portfolio.rest.controllers;

import com.lavinj87.stocks.portfolio.rest.entities.Sector;
import com.lavinj87.stocks.portfolio.rest.repositories.SectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/sectors/")
public class SectorController
{
	private final SectorRepository repository;

	@Autowired
	public SectorController(SectorRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	public List<Sector> findSectors() {
		return repository.findAll();
	}

	@GetMapping("/{sectorId}")
	public Sector findSectorById(@PathVariable int sectorId) {
		return repository.findById(sectorId).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Unable to find sector with id " + sectorId));
	}

	@PostMapping("/{sectorId}")
	public Sector saveSector(@PathVariable int sectorId, @RequestBody Sector sector) {
		sector.setSectorId(sectorId);
		return repository.save(sector);
	}

	@DeleteMapping("/{sectorId}")
	public void deleteSector(@PathVariable int sectorId) {
		repository.deleteById(sectorId);
	}
}
