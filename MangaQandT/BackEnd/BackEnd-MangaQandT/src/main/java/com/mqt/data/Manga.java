package com.mqt.data;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Manga {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "mangaName", unique = true)
	private String name;
	private String readStatus;
	private int rating;
	private int opt;

	public Manga(String name, String readStatus, int rating, int opt) {
		super();
		this.name = name;
		this.readStatus = readStatus;
		this.rating = rating;
		this.opt = opt;
	}

	public Manga(int id, String name, String readStatus, int rating, int opt) {
		super();
		this.id = id;
		this.name = name;
		this.readStatus = readStatus;
		this.rating = rating;
		this.opt = opt;
	}

	public Manga() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getReadStatus() {
		return readStatus;
	}

	public void setReadStatus(String readStatus) {
		this.readStatus = readStatus;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public int getOpt() {
		return opt;
	}

	public void setOpt(int opt) {
		this.opt = opt;
	}

	@Override
	public String toString() {
		return "Manga [name=" + name + ", readStatus=" + readStatus + ", rating=" + rating + ", opt=" + opt + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, readStatus, rating, opt);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Manga other = (Manga) obj;
		return rating == other.rating && id == other.id && Objects.equals(name, other.name)
				&& Objects.equals(readStatus, other.readStatus) && opt == other.opt;
	}

}
