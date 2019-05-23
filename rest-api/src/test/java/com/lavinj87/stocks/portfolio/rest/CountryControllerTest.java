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

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
//@SpringBootTest
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
    public void whenValidInput_thenReturns200() throws Exception {
        mockMvc.perform(post("/countries/{countryId}", "ES")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(es)))
                .andExpect(status().isOk());
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
    public void whenValidInput_ThenReturnsCountry() throws Exception {
        when(countryRepository.save(es)).thenReturn(es);

        String expected = mockMvc.perform(post("/countries/{countryId}", "ES")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(es)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse().getContentAsString();

        String actual = objectMapper.writeValueAsString(es);

        Assert.assertEquals(expected, actual);
    }
}