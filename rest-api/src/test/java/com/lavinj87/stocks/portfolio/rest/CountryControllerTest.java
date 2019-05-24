package com.lavinj87.stocks.portfolio.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lavinj87.stocks.portfolio.rest.controllers.CountryController;
import com.lavinj87.stocks.portfolio.rest.entities.Country;
import com.lavinj87.stocks.portfolio.rest.repositories.CountryRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = CountryController.class)
public class CountryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CountryRepository countryRepository;

    private Country es = new Country("ES", "Spain");

	@Test
	public void findAllCountries() throws Exception {
		List<Country> countries = Arrays.asList(new Country("ES", "Spain"), new Country("FR", "France"));
		when(countryRepository.findAll()).thenReturn(countries);

		String actual = mockMvc.perform(get("/countries/"))
				.andExpect(status().isOk())
				.andReturn()
				.getResponse().getContentAsString();
		String expected = "[{\"countryId\":\"ES\",\"name\":\"Spain\"},{\"countryId\":\"FR\",\"name\":\"France\"}]";

		Assert.assertEquals(expected, actual);
	}

	@Test
	public void whenValidInput_ThenReturnsCountry() throws Exception {
		when(countryRepository.save(es)).thenReturn(es);

		String actual = mockMvc.perform(post("/countries/{countryId}/", "ES")
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(es)))
				.andExpect(status().isOk())
				.andReturn()
				.getResponse().getContentAsString();
		String expected = "{\"countryId\":\"ES\",\"name\":\"Spain\"}";

		Assert.assertEquals(expected, actual);
	}

    @Test
    public void whenValidInput_thenSaves() throws Exception {
        mockMvc.perform(post("/countries/{counCotryId}", "ES")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(es)))
                .andExpect(status().isOk());

        verify(countryRepository).save(es);
    }

    @Test
    public void givenCountryId_ThenDeletesCountry() throws Exception {
        mockMvc.perform(delete("/countries/{countryId}", "ES"))
                .andExpect(status().isOk());
        verify(countryRepository).deleteById("ES");
    }

}