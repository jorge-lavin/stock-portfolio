package com.lavinj87.stocks.portfolio.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lavinj87.stocks.portfolio.rest.controllers.PortfolioController;
import com.lavinj87.stocks.portfolio.rest.entities.Portfolio;
import com.lavinj87.stocks.portfolio.rest.repositories.PortfolioRepository;
import com.lavinj87.stocks.portfolio.rest.repositories.StockRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
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
@WebMvcTest(controllers = PortfolioController.class)
public class PortfolioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PortfolioRepository portfolioRepository;

    @MockBean
    private StockRepository stockRepository;

    private Portfolio portfolio;

    @Before
    public void setup() {
        portfolio = new Portfolio(42, "Test Portfolio");
    }

    @Test
    public void findPortfolios() throws Exception {

        List<Portfolio> portfolios = Arrays.asList(new Portfolio(1, "First"), new Portfolio(2, "Second"));
        when(portfolioRepository.findAll()).thenReturn(portfolios);

        String actual = mockMvc.perform(get("/portfolios/"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        String expected = "[{\"currencyId\":\"EUR\",\"name\":\"Euro\"},{\"currencyId\":\"USD\",\"name\":\"Euro\"}]";

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void whenValidInput_ThenReturnsPortfolio() throws Exception {
        when(portfolioRepository.save(portfolio)).thenReturn(portfolio);

        String actual = mockMvc.perform(post("/portfolios/{portfolioId}/", 42)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(portfolio)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();
        String expected = "{\"currencyId\":\"EUR\",\"name\":\"Euro\"}";

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void whenValidInput_thenSaves() throws Exception {
        mockMvc.perform(post("/portfolios/{portfolioId}/", 42)
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(portfolio)))
                .andExpect(status().isOk());

        verify(portfolioRepository).save(portfolio);
    }

    @Test
    public void givenPortfolioId_ThenDeletesPortfolio() throws Exception {
        mockMvc.perform(delete("/portfolios/{portfolioId}/", 42))
                .andExpect(status().isOk());
        verify(portfolioRepository).deleteById(42);
    }
}
