package com.mqt.rest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mqt.data.Manga;
import com.mqt.services.MangaServices;

@RestController
@CrossOrigin
public class MangaController {
	private MangaServices services;

	public MangaController(MangaServices services) {
		super();
		this.services = services;
	}

	@PostMapping("/createManga")
	public ResponseEntity<Manga> createManga(@RequestBody Manga manga) {
		Manga created = services.createManga(manga);
		return new ResponseEntity<>(created, HttpStatus.CREATED);
	}

	@GetMapping("/getManga")
	public List<Manga> getManga() {
		return services.getManga();
	}

	@PutMapping("/putManga/{id}")
	public ResponseEntity<Manga> update(@PathVariable int id, @RequestBody Manga newManga) {
		Manga body = this.services.update(id, newManga);
		return new ResponseEntity<Manga>(body, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("deleteManga/{id}")
	public ResponseEntity<String> deleteManga(@PathVariable int id) {
		String body = this.services.deleteManga(id);
		return new ResponseEntity<String>(body, HttpStatus.NO_CONTENT);
	}
}
