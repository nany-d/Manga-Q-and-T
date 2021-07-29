package com.mqt.services;

import java.util.List;

import com.mqt.data.Manga;

public interface MangaServices {

	public Manga createManga(Manga manga);

	public List<Manga> getManga();

	public Manga update(int id, Manga manga);

	public String deleteManga(int id);

}
