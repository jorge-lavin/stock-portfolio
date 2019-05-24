package com.lavinj87.stocks.portfolio.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lavinj87.stocks.portfolio.rest.controllers.CountryController;
import com.lavinj87.stocks.portfolio.rest.controllers.CurrencyController;
import com.lavinj87.stocks.portfolio.rest.entities.Country;
import com.lavinj87.stocks.portfolio.rest.entities.Currency;
import com.lavinj87.stocks.portfolio.rest.repositories.CountryRepository;
import com.lavinj87.stocks.portfolio.rest.repositories.CurrencyRepository;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = CurrencyController.class)
public class CurrencyControllerTest
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CurrencyRepository countryRepository;

    private Currency euro = new Currency("EUR", "Euro");

	@Test
	public void findAllCurrencies() throws Exception {
		List<Currency> currencies = Arrays.asList(new Currency("EUR", "Euro"), new Currency("USD", "Euro"));
		when(countryRepository.findAll()).thenReturn(currencies);

		String actual = mockMvc.perform(get("/currencies/"))
				.andExpect(status().isOk())
				.andReturn()
				.getResponse().getContentAsString();
		String expected = "[{\"currencyId\":\"EUR\",\"name\":\"Euro\"},{\"currencyId\":\"USD\",\"name\":\"Euro\"}]";

		Assert.assertEquals(expected, actual);
	}

	@Test
	public void whenValidInput_ThenReturnsCurrency() throws Exception {
		when(countryRepository.save(euro)).thenReturn(euro);

		String actual = mockMvc.perform(post("/currencies/{currencyId}/", "EUR")
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(euro)))
				.andExpect(status().isOk())
				.andReturn()
				.getResponse().getContentAsString();
		String expected = "{\"currencyId\":\"EUR\",\"name\":\"Euro\"}";

		Assert.assertEquals(expected, actual);
	}

    @Test
    public void whenValidInput_thenSaves() throws Exception {
        mockMvc.perform(post("/currencies/{currencyId}", "EUR")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(euro)))
                .andExpect(status().isOk());

        verify(countryRepository).save(euro);
    }

    @Test
    public void givenCurrencyId_ThenDeletesCurrency() throws Exception {
        mockMvc.perform(delete("/currencies/{currencyId}", "EUR"))
                .andExpect(status().isOk());
        verify(countryRepository).deleteById("EUR");
    }

}