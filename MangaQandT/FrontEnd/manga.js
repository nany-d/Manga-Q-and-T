"use strict";

const baseURL = "http://localhost:8080";

document.querySelector("#mangaForm").addEventListener("submit", function(e) {
    e.preventDefault();

    //where the magic will happen

    const form = e.target;
    const data = {
        name : this.mangaName.value,
        readStatus : this.mangaRead.value,
        rating : this.mangaRating.value,
        opt : this.mangaOpt.value
    }
    createManga(data, form);
})

const renderManga = manga => {
    const newManga = document.createElement("div");

    const mangaName = document.createElement("h3");
    mangaName.innerText = manga.name;
    newManga.appendChild(mangaName);

    const mangaRead = document.createElement("p");
    mangaRead.innerText = manga.readStatus;
    newManga.appendChild(mangaRead);

    const mangaRating = document.createElement("p");
    mangaRating.innerText = manga.rating;
    newManga.appendChild(mangaRating);

    const updateForm = document.createElement("form");
    const updateName = document.createElement("input");
    updateForm.appendChild(updateName);
    const updateRead = document.createElement("input");
    updateForm.appendChild(updateRead);
    const updateRating = document.createElement("input");
    updateForm.appendChild(updateRating);
    const updateOpt = document.createElement("input");
    updateForm.appendChild(updateOpt);
    const updateButton = document.createElement("button");
    updateButton.innerText = "UPDATE";
    updateButton.addEventListener("click", () => updateManga(manga.id, updateName, updateRead, updateRating, updateOpt));
    newManga.appendChild(updateForm);
    newManga.appendChild(updateButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "DELETE";
    deleteButton.addEventListener("click", () => deleteManga(manga.id));
    newManga.appendChild(deleteButton);

    mangaBase.appendChild(newManga);
}

const createManga = (data, form) => {
    axios.post(`${baseURL}/createManga`, data)
        .then(res => {
            getManga();
            form.reset();
            form.mangaName.focus();
            alert(`Your manga suggestion has arrived!`);
        }).catch(err => console.log(err));
}

const getManga = () => {
    axios.get(`${baseURL}/getManga`)
        .then(res => {
            const manga = res.data;
            mangaBase.innerHTML = "";
            manga.forEach(manga => renderManga(manga));
        }).catch(err => console.log(err));
}

const getMangaByName = name => {
    axios.get(`${baseURL}/getManga/${name}`)
        .then(res => {
            const manga = res.data;
            mangaBase.innerHTML = "";
            manga.forEach(manga => renderManga(manga));
        }).catch(err => console.log(err));

}

const updateManga = (id, updateName, updateRead, updateRating, updateOpt) => {
    const updateData = {
        name : updateName.value,
        readStatus : updateRead.value,
        rating : updateRating.value,
        opt : updateOpt.value
    }
    axios.put(`${baseURL}/putManga/${id}`, updateData)
        .then(res => {
            getManga();
        }).catch(err => console.log(err));
}

const deleteManga = id => {
    axios.delete(`${baseURL}/deleteManga/${id}`)
        .then(res => {
            getManga();
        }).catch(err => console.log(err));
}