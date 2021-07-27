package com.mqt.data.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mqt.data.Manga;

@Repository
public interface MangaRepo extends JpaRepository<Manga, Integer> {

	List<Manga> findByNameIgnoreCase(String name);

}
