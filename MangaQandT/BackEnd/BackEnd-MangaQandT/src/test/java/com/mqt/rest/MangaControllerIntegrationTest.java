package com.mqt.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mqt.data.Manga;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(scripts = { "classpath:manga-schema.sql",
		"classpath:manga-data.sql" }, executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
public class MangaControllerIntegrationTest {

	@Autowired
	private MockMvc mockMVC;

	@Autowired
	private ObjectMapper mapper;

	@Test
	void testCreate() throws Exception {
		Manga test = new Manga("Dragon Ball", "read", 5, 221);
		String testAsJSON = this.mapper.writeValueAsString(test);

		System.out.println(test);
		System.out.println(testAsJSON);

		RequestBuilder request = post("/createManga").contentType(MediaType.APPLICATION_JSON).content(testAsJSON);
		ResultMatcher checkStatus = status().is(201);

		Manga testCreated = new Manga("Dragon Ball", "read", 5, 221);
		testCreated.setId(2);
		String testCreatedAsJSON = this.mapper.writeValueAsString(testCreated);

		ResultMatcher checkBody = content().json(testCreatedAsJSON);
		this.mockMVC.perform(request).andExpect(checkStatus).andExpect(checkBody);
	}

	@Test
	void testUpdate() throws Exception {
		int id = 1;
		Manga newManga = new Manga(id, "Berserk", "not read", 5, 211);
		String newMangaAsJSON = this.mapper.writeValueAsString(newManga);

		RequestBuilder req = put("/putManga/" + id).contentType(MediaType.APPLICATION_JSON).content(newMangaAsJSON);
		ResultMatcher checkStatus = status().isAccepted();
		ResultMatcher checkBody = content().json(newMangaAsJSON);

		this.mockMVC.perform(req).andExpect(checkStatus).andExpect(checkBody);
	}

	@Test
	void testDelete() throws Exception {
		RequestBuilder request = delete("/deleteManga/1");
		ResultMatcher checkStatus = status().is(204);
		ResultMatcher checkBody = content().string("Manga deleted");

		this.mockMVC.perform(request).andExpect(checkStatus).andExpect(checkBody);
	}

}
