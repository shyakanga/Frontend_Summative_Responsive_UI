const trailingSpace = /^\S(?:.*\S)?$/;
const pageNumRegex = /^[1-9]\d*$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const regextag = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
const repeatingTextRegex = /\b(\w+)\s+\1\b/i;

export function titleRegexValidation(text){
    if(!trailingSpace.test(text)){
        return "Title canot be empty, start, or end with a space";
    }

    if(repeatingTextRegex.test(text)){
        return "Title has a duplicate word"
    }

    return "";
}

export function authorValidationRegex(text){
    if (!trailingSpace.test(text)){
        return "Author cannot be empty, start, or end with a space"
    }
    return "";
}

export function validatePagesRegex(text){
    if(!pageNumRegex.test(text)){
        return "Pages must be a whole number"
    }
    return "";
}

export function tagRegex(text){
    if(!regextag.test(text)){
        return "Tag must not contain any special characters"
    }
    return "";
}

export function checkDate(text){
    if(!dateRegex.test(text)){
        return "Date must look like this: YYYY-MM-DD"
    }

    const realDates = new Date(text);
    if(isNaN(realDates.getTime()) || realDates.toISOString().slice(0, 10) !== text){
        return "Date doesn't exist"
    }
    return "";
}

const idBookRegex = /^book_\d+$/;

export function checkSettNum(text){
    if(!pageNumRegex.test(text)){
        return "This must be a whole number";
    }
    return "";
}

function checkBook(book){
    if (typeof book !== "object" || book === null || Array.isArray(book)){
        return "The file must contain an object with the boks details";
    }

    const requiredFields = ["id", "title", "author", "tag", "createdAt", "updatedAt"];
    for (const fieldName of requiredFields){
        if(book[fieldName] === undefined){
            return "this fieldname id missing: " + fieldName;
        }
    }

    if (book.pages === undefined){
        return "pages field is missing";
    }

    if (!idBookRegex.test(book.id)){
        return "id must be this format: book_001";
    }

    const results = [
        titleRegexValidation(book.title),
        authorValidationRegex(book.author),
        validatePagesRegex(book.pages),
        tagRegex(book.tag),
        checkDate(book.createdAt),
        checkDate(book.updatedAt)
    ];

    for (const error of results){
        if(error !== ""){
            return error;
        }
    }
    return "";
}

export function checkBooks(bookList){
    if(!Array.isArray(bookList)){
        return "There is no list in the file"
    }

    const takenIds = [];
    for (let index = 0; index < bookList.length; index++){
        const book = bookList[index];
        const problem = checkBook(book);

        if (problem !== ""){
            return "book"+(index+1)+": "+problem;
        }

        if (takenIds.includes(book.id)){
            return "book id "+ book.id+ " is used twice"
        }

        takenIds.push(book.id);
    }

    return "";
}