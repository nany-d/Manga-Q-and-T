package com.mqt.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mqt.data.Manga;
import com.mqt.data.repos.MangaRepo;

@Service
public class MangaServicesDB implements MangaServices {

	private MangaRepo repo;

	public MangaServicesDB(MangaRepo repo) {
		super();
		this.repo = repo;
	}

	@Override
	public Manga createManga(Manga manga) {
		return this.repo.save(manga);
	}

	@Override
	public List<Manga> getManga() {
		return this.repo.findAll();
	}

	@Override
	public Manga update(int id, Manga newManga) {
		Manga found = this.repo.findById(id).get();

		found.setName(newManga.getName());
		found.setReadStatus(newManga.getReadStatus());
		found.setRating(newManga.getRating());
		found.setOpt(newManga.getOpt());

		Manga updated = this.repo.save(found);

		return updated;
	}

	@Override
	public String deleteManga(int id) {
		this.repo.deleteById(id);
		boolean exists = this.repo.existsById(id);
		if (!exists) {
			return "Manga deleted";
		} else {
			return null;
		}
	}

}
