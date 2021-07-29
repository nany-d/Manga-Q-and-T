"use strict";

(function() {
const baseURL = "http://localhost:8080";

let count = 0;

const themeF = document.querySelector("#themeF");
const themeR = document.querySelector("#themeR");
const pacingA = document.querySelector("#pacingA");
const pacingP = document.querySelector("#pacingP");
const feelingsG = document.querySelector("#feelingsG");
const feelingsB = document.querySelector("#feelingsB");


document.querySelector("#questionnaire").addEventListener("submit", function(e) {
    e.preventDefault();
    if(themeF.checked) {
        count += 1;
    }
    if(themeR.checked) {
        count += 2;
    }
    if(pacingA.checked) {
        count += 10;
    }
    if(pacingP.checked) {
        count += 20;
    }
    if(feelingsG.checked) {
        count += 100;
    }
    if(feelingsB.checked) {
        count += 200;
    }
    const chosenOpt = count;
    let chosenName;
    switch(chosenOpt){
        case 111:
            chosenName = "Fairy Tail";
            break;
        case 211:
            chosenName = "Vinland Saga";
            break;
        case 121:
            chosenName = "Vagabond";
            break;
        case 112:
            chosenName = "Life of a House Husband";
            break;
        case 221:
            chosenName = "Berserk";
            break;
        case 122:
            chosenName = "Death Note";
            break;
        case 212:
            chosenName = "Stein's Gate";
            break;
        case 222:
            chosenName = "Monster";
            break;
        default:
            chosenName = "Not Found - Please fill out all fields";
            break;
    }
    const data = {
        name : chosenName,
        readStatus : "not read",
        rating : 0,
        opt : chosenOpt
    }
    count = 0;
    createMangaQ(data);
})

// document.querySelector("#mangaForm").addEventListener("submit", function(e) {
//     e.preventDefault();

//     const form = e.target;
//     const data = {
//         name : this.mangaName.value,
//         readStatus : this.mangaRead.value,
//         rating : this.mangaRating.value,
//         opt : this.mangaOpt.value
//     }
//     createManga(data, form);
// })

const renderManga = manga => {
    const mangaColumn = document.createElement("div");
    mangaColumn.classList.add("col");

    const mangaCard = document.createElement("div");
    switch(manga.opt){
        case 111:
            //mangaCard.style("background: url(manga.jpg);");
            break;
        case 211:
            
            break;
        case 121:
            
            break;
        case 112:
            
            break;
        case 221:
            
            break;
        case 122:
            
            break;
        case 212:
            
            break;
        case 222:
            
            break;
        default:
            break;
    }
    mangaCard.classList.add("card");
    mangaColumn.appendChild(mangaCard);

    const newManga = document.createElement("div");
    newManga.classList.add("card-body");

    const mangaName = document.createElement("h3");
    mangaName.innerText = manga.name;
    mangaName.classList.add("card-title");
    newManga.appendChild(mangaName);

    const mangaRead = document.createElement("p");
    mangaRead.innerText = manga.readStatus;
    mangaRead.classList.add("card-text");
    newManga.appendChild(mangaRead);

    const mangaRating = document.createElement("p");
    mangaRating.innerText = manga.rating;
    mangaRating.classList.add("card-text");
    newManga.appendChild(mangaRating);

    const updateForm = document.createElement("form");
    // const updateName = document.createElement("input");
    // updateForm.appendChild(updateName);
    const readLabel = document.createElement("p");
    readLabel.innerText = "Update Read Status: ";
    updateForm.appendChild(readLabel);
    const updateRead = document.createElement("input");
    updateForm.appendChild(updateRead);
    const ratingLabel = document.createElement("p");
    ratingLabel.innerText = "Give New Rating: ";
    updateForm.appendChild(ratingLabel);
    const updateRating = document.createElement("input");
    updateForm.appendChild(updateRating);
    // const updateOpt = document.createElement("input");
    // updateForm.appendChild(updateOpt);
    const updateButton = document.createElement("button");
    updateButton.innerText = "UPDATE";
    updateButton.classList.add("btn", "btn-dark");
    updateButton.addEventListener("click", () => updateManga(manga.id, manga.name, updateRead, updateRating, manga.opt));
    newManga.appendChild(updateForm);
    newManga.appendChild(updateButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "DELETE";
    deleteButton.classList.add("btn", "btn-dark");
    deleteButton.addEventListener("click", () => deleteManga(manga.id));
    newManga.appendChild(deleteButton);

    mangaCard.appendChild(newManga);

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

const createMangaQ = (data) => {
    axios.post(`${baseURL}/createManga`, data)
        .then(res => {
            getManga();
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

const updateManga = (id, updateName, updateRead, updateRating, updateOpt) => {
    const updateData = {
        name : updateName,
        readStatus : updateRead.value,
        rating : updateRating.value,
        opt : updateOpt
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

})();