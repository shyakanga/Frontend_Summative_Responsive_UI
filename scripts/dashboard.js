import { books } from "./seed.js"
import { settings } from "./state.js"


function formatDate(date){
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10){
        month = "0" + month;
    }
    if (day <10){
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}


let totalPages = 0;
for (const book of books){
    totalPages = totalPages + book.pages;
}

const totalReadingMin = Math.round((totalPages / settings.pagesPerHour) * 60);
const readingHours = Math.floor(totalReadingMin / 60);
const minutes = totalReadingMin % 60;

let topTag = "";
let mostUsedCount = 0;


for (const book of books){
    let count = 0;

    for (const otherBook of books){
        if (otherBook.tag === book.tag){
            count = count+1;
        }
    }

    if(count > mostUsedCount){
        mostUsedCount = count;
        topTag = book.tag;
    }
}

const chartDates = [];
const booksPerDay = [];
let mostBooks = 0;

for (let daysAgo = 6; daysAgo >= 0; daysAgo--){
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    const dateText = formatDate(date);
    let count = 0;
    for (const book of books) {
        if (book.createdAt === dateText){
            count = count + 1;
        }
    }

    chartDates.push(dateText);
    booksPerDay.push(count);

    if(count > mostBooks){
        mostBooks = count;
    }
}

let barsHtml = "";

for (let dayIndex = 0; dayIndex < 7; dayIndex++){
    let height = 5;

    if (booksPerDay[dayIndex] > 0){
        height = (booksPerDay[dayIndex] / mostBooks) * 100;
    }

    let booksCount = booksPerDay[dayIndex] + " books";
    if (booksPerDay[dayIndex] === 1){
        booksCount = "1 book";
    }

    barsHtml = barsHtml + '<div class="day"><div class="bar-space"><div class="bar" style="height: ' +
    height + '%"><span>' + booksCount + '</span></div></div><span>' + chartDates[dayIndex].slice(5) + "</span></div>"; 
}

document.getElementById("bars").innerHTML = barsHtml;
document.getElementById("total-books").textContent = books.length;
document.getElementById("total-pages").textContent = totalPages;
document.getElementById("reading-time").textContent = readingHours + "h" + minutes + "m reading time";

if (mostUsedCount == 0){
    document.getElementById("top-tag").textContent = "None";
} else {
    document.getElementById("top-tag").textContent = topTag + " ( " + mostUsedCount + " ) "; 
};

const capMessage = document.getElementById("cap-message");

if(totalPages > settings.pageCap){
    capMessage.setAttribute("aria-live", "assertive");

    capMessage.textContent = totalPages + " of " + settings.pageCap + " pages used " + (totalPages - settings.pageCap) + " pages over the cap ";
} else{
    capMessage.setAttribute("aria-live", "polite");
    capMessage.textContent = totalPages + "of" + settings.pageCap + " pages used " + (settings.pageCap - totalPages) + " pages left ";
}