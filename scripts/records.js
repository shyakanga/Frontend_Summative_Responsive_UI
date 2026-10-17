import {books} from "./state.js"
import {makeRegex, matchesRegex, highlightMatches} from "./search.js"

const searchingBox = document.getElementById("search");
const checkSensitivityInput = document.getElementById("ignore-case");
const searchError = document.getElementById("search-error")
const tableBody = document.getElementById("table-body");
const cardList = document.getElementById("cards");
const emptyResults = document.getElementById("empty-message");


let sortBy = "title";
let sortDirection = 1;


const sortButtons = [
    {column: "title", tableButtonid: "sort-title", cardsButtonid: "sort-title-card"},
    { column: "pages", tableButtonid: "sort-pages", cardsButtonid: "sort-pages-card"},
    { column: "createdAt", tableButtonid: "sort-date", cardsButtonid: "sort-date-card"}
];

function createElement(parent, tagType, className, label, text, searchRegex){
    const element = document.createElement(tagType);
    element.className = className;
    element.append(label);
    highlightMatches(element, text, searchRegex);
    parent.append(element);
    return element;
}


function isRegexMatch(book, searchRegex){
    return(
        matchesRegex(book.title, searchRegex) || matchesRegex(book.author, searchRegex) || matchesRegex(String(book.pages), searchRegex) || matchesRegex(book.tag, searchRegex) || matchesRegex(book.createdAt, searchRegex) || matchesRegex(book.updatedAt, searchRegex) || matchesRegex(book.id, searchRegex)
    );    
}

function sortBooks(firstBook, secondBook){
    if (sortBy == "title"){
        return firstBook.title.localeCompare(secondBook.title) * sortDirection;
    }
    if (sortBy=="pages"){
        return (firstBook.pages - secondBook.pages)*sortDirection;
    }
    return firstBook.createdAt.localeCompare(secondBook.createdAt) * sortDirection;
}

function addRow(book, searchRegex){
    const row = document.createElement("tr");
    createElement(row, "td", "", "", book.title, searchRegex);
    createElement(row, "td", "", "", book.author, searchRegex)
    createElement(row, "td", "", "", String(book.pages), searchRegex);
    createElement(row, "td", "", "", book.tag, searchRegex);
    createElement(row, "td", "", "", book.createdAt, searchRegex);
    createElement(row, "td", "", "", book.updatedAt, searchRegex);
    createElement(row, "td", "", "", book.id, searchRegex);
    tableBody.append(row)

}


function addCard(book, searchRegex){
    const card = document.createElement("article");
    card.className = "book-card";
    createElement(card, "p", "tag", "", book.tag, searchRegex);
    createElement(card, "h2", "", "", book.title, searchRegex);
    createElement(card,"p", "", "", book.author, searchRegex)
    createElement(card, "p", "", "", book.createdAt, searchRegex);
    const descCardLine = document.createElement("p");
    descCardLine.className = "card-line";
    createElement(descCardLine, "span", "", "Updated at: ", book.updatedAt, searchRegex);
    const pagesLine = createElement(descCardLine, "span", "", "", String(book.pages), searchRegex);
    pagesLine.append(" pages");

    card.append(descCardLine);
    createElement(card, "p", "card-id", "ID: ", book.id, searchRegex);
    cardList.append(card);
}

function filterBooks() {
    const text = searchingBox.value;
    let searchRegex = null;
    searchError.textContent = "";
    if(text!= ""){
        let regexFlags = "gi";
        if (checkSensitivityInput.checked) {
            regexFlags = "g";
        }

        searchRegex = makeRegex(text, regexFlags);
        if(searchRegex == null){
            searchError.textContent = "That isn't a valid regex"
            return;
        }
    }

    const matchingBooks = [];
    for (const book of books) {
        if (searchRegex === null || isRegexMatch(book, searchRegex)){
            matchingBooks.push(book);
        }
    }

    matchingBooks.sort(sortBooks);

    tableBody.textContent = "";
    cardList.textContent = "";

    for(const book of matchingBooks){
        addRow(book, searchRegex);
        addCard(book, searchRegex);
    }

    emptyResults.hidden = matchingBooks.length !== 0;
}


function sortElements(column){
    if(sortBy === column){
        sortDirection = sortDirection * -1;
    } else{
        sortBy = column;
        sortDirection = 1;
    }
    filterBooks();
}

for (const item of sortButtons) {
    document.getElementById(item.tableButtonid).addEventListener("click", function (){
        sortElements(item.column);
    });
}

searchingBox.addEventListener("input", filterBooks);
checkSensitivityInput.addEventListener("change", filterBooks);


filterBooks();