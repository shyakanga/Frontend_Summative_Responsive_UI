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