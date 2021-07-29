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

document.querySelector("#mangaa").addEventListener("click", function(e) {
    e.preventDefault();
    getManga();
})

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
    //checkMangaExists(count);
    const chosenOpt = count;
    count = 0;
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
        case 500:
            chosenName = "Duplicate";
            break;
        default:
            chosenName = "Not Found - Please fill out all fields";
            break;
    }
    if (chosenName == "Duplicate") {
        alert(`This manga already exists in your database!`);
        return;
    }
    if (chosenName == "Not Found - Please fill out all fields") {
        alert(`Not Found - Please fill out all fields`);
        return;
    }
    const data = {
        name : chosenName,
        readStatus : "not read",
        rating : 0,
        opt : chosenOpt
    }
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
    
    mangaCard.classList.add("card");
    mangaColumn.appendChild(mangaCard);

    const newManga = document.createElement("div");
    newManga.classList.add("card-body");
    switch(manga.opt){
        case 111:
            newManga.id = "mangaBackground111";
            break;
        case 211:
            newManga.id = "mangaBackground211";
            break;
        case 121:
            newManga.id = "mangaBackground121";
            break;
        case 112:
            newManga.id = "mangaBackground112";
            break;
        case 221:
            newManga.id = "mangaBackground221";
            break;
        case 122:
            newManga.id = "mangaBackground122";
            break;
        case 212:
            newManga.id = "mangaBackground212";
            break;
        case 222:
            newManga.id = "mangaBackground222";
            break;
        default:
            break;
    }
    const mangaName = document.createElement("h3");
    mangaName.innerText = manga.name;
    mangaName.classList.add("card-title");
    newManga.appendChild(mangaName);

    const mangaRead = document.createElement("h5");
    mangaRead.innerText = `Read Status: ${manga.readStatus}`;
    mangaRead.classList.add("card-text");
    newManga.appendChild(mangaRead);

    const mangaRating = document.createElement("h5");
    mangaRating.innerText = `Personal Rating: ${manga.rating}`;
    mangaRating.classList.add("card-text");
    newManga.appendChild(mangaRating);

    const updateForm = document.createElement("form");
    // const updateName = document.createElement("input");
    // updateForm.appendChild(updateName);
    const readLabel = document.createElement("p");
    readLabel.innerText = "Update Read Status: ";
    updateForm.appendChild(readLabel);
    const updateRead = document.createElement("input");
    updateRead.type = "text";
    updateRead.placeholder = "read/reading/not read";
    updateForm.appendChild(updateRead);
    const ratingLabel = document.createElement("p");
    ratingLabel.innerText = "Give New Rating: ";
    updateForm.appendChild(ratingLabel);
    const updateRating = document.createElement("input");
    updateRating.type = "number";
    updateRating.placeholder = "0-10";
    updateRating.max = "10";
    updateRating.min = "0";
    updateForm.appendChild(updateRating);
    // const updateOpt = document.createElement("input");
    // updateForm.appendChild(updateOpt);
    const updateButton = document.createElement("button");
    updateButton.innerText = "UPDATE";
    updateButton.classList.add("btn", "btn-dark");
    updateButton.id = "updateButton";
    updateButton.addEventListener("click", () => updateManga(manga.id, manga.name, updateRead, updateRating, manga.opt));
    newManga.appendChild(updateForm);
    newManga.appendChild(updateButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "DELETE";
    deleteButton.classList.add("btn", "btn-dark");
    deleteButton.id = "deleteButton";
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
        }).catch(err => {
            alert(`This manga already exists in your database!`);
            console.log(err);
        });
}

const checkMangaExists = (num) => {
    axios.get(`${baseURL}/getManga`)
        .then(res => {
            const manga = res.data;
            manga.forEach(manga => {
                if (manga.opt == num) {
                    //count = 500;
                    return;
                }
            });
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