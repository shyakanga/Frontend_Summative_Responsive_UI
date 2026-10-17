import {loadBooks, saveBooks, getSavedSettings} from "./storage.js";

export const books = loadBooks();
export const settings = getSavedSettings();

export function addBook(book){
    books.push(book);
    saveBooks(books);
}

export function getBookById(bookId) {
    for (const book of books) {
        if (book.id === bookId) {
            return book;
        }
    }
    return null;
}

export function removeBook(bookId){
    for (let index = 0; index < books.length; index++){
        if(books[index].id == bookId){
            books.splice(index, 1);
            saveBooks(books);
            return;
        }
    }
}

export function importBooks(bookList) {
    books.length = 0;
    for (const book of bookList){
        books.push(book);
    }
    saveBooks(books);
}

export function getNextId(){
    let higgestId = 0;
    for (const book of books){
        const currentNumber = Number(book.id.slice(5));
        if(currentNumber > higgestId){
            higgestId = currentNumber;
        }
    }

    return "book_" + String(higgestId+1).padStart(4, "0");
}

export function todayDate(){
    const date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10){
        month = "0"+ month;
    }

    if (day < 10){
        day = "0"+ day;
    }

    return date.getFullYear() + "-" + month+ "-" + day;
}
