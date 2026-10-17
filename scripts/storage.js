import {checkBooks} from "./validators.js";

export function loadBooks(){
    let saveData = [];

    try{
        saveData = JSON.parse(localStorage.getItem("books"));
    } catch{
        saveData = [];
    }
    console.log("checkbook is saying", checkBooks(saveData))
    if (checkBooks(saveData) !== ""){
        saveData = [];
    }
    return saveData;
}

export function saveBooks(books){
    localStorage.setItem("books", JSON.stringify(books));
}

export function getSavedSettings(){
    let savedData = null;
    try{
        savedData = JSON.parse(localStorage.getItem("settings"));
    }catch{
        savedData = null;
    }

    if (savedData === null || typeof savedData.pageCap !== "number" || typeof savedData.pagesPerHour !== "number"){
        return {pageCap: 500, pagesPerHour: 30};
    }

    return savedData;
}

export function saveSettings(settings){
    localStorage.setItem("settings", JSON.stringify(settings));
}