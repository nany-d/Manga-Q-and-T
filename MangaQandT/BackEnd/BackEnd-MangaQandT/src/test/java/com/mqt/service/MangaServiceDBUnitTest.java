package com.mqt.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import com.mqt.data.Manga;
import com.mqt.data.repos.MangaRepo;
import com.mqt.services.MangaServicesDB;

@SpringBootTest
@ActiveProfiles("test")
public class MangaServiceDBUnitTest {

	@Autowired
	private MangaServicesDB service;

	@MockBean
	private MangaRepo repo;

	@Test
	void testCreate() {

		Manga testManga = new Manga("Berserk", "not read", 5, 211);

		Manga savedManga = new Manga(1, "Berserk", "not read", 5, 211);

		Mockito.when(this.repo.save(testManga)).thenReturn(savedManga);

		assertThat(this.service.createManga(testManga)).isEqualTo(savedManga);

		Mockito.verify(this.repo, Mockito.times(1)).save(testManga);
	}

	@Test
	void testList() {
		Manga testManga = new Manga(1, "Dragon Ball", "read", 5, 221);
		Manga testManga2 = new Manga(2, "Berserk", "not read", 5, 211);

		List<Manga> testMangaList = new ArrayList<>();
		testMangaList.add(testManga);
		testMangaList.add(testManga2);

		Mockito.when(this.repo.findAll()).thenReturn(testMangaList);

		assertThat(this.service.getManga()).isEqualTo(testMangaList);

		Mockito.verify(this.repo, Mockito.times(1)).findAll();
	}

	@Test
	void testUpdate() {
		int id = 1;
		Manga testManga = new Manga(id, "Dragon Ball", "read", 5, 221);
		Manga testNewManga = new Manga(id, "Berserk", "not read", 5, 211);

		Mockito.when(this.repo.findById(id)).thenReturn(Optional.of(testManga));
		Mockito.when(this.repo.save(new Manga(id, "Berserk", "not read", 5, 211))).thenReturn(testNewManga);

		Manga actual = this.service.update(id, testNewManga);

		assertThat(actual).isEqualTo(testNewManga);

		Mockito.verify(this.repo, Mockito.times(1)).findById(id);
		Mockito.verify(this.repo, Mockito.times(1)).save(new Manga(id, "Berserk", "not read", 5, 211));
	}

	@Test
	void testDeleteSucceeds() {
		int id = 1;

		Mockito.when(this.repo.existsById(id)).thenReturn(false);

		assertThat(this.service.deleteManga(id)).isEqualTo("Manga deleted");

		Mockito.verify(this.repo, Mockito.times(1)).existsById(id);
	}

	@Test
	void testDeleteFails() {
		int id = 1;

		Mockito.when(this.repo.existsById(id)).thenReturn(true);

		assertThat(this.service.deleteManga(id)).isEqualTo(null);

		Mockito.verify(this.repo, Mockito.times(1)).existsById(id);
	}

}
