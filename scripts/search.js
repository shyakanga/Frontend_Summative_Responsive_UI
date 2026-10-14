export function makeRegex(text, regexFlags){
    try{
        return new RegExp(text, regexFlags);
    } catch {
        return null;
    }
}


export function matchesRegex(text, searchRegex){
    return text.search(searchRegex) !== -1;
}

export function highlightMatches(parent, text, searchRegex){
    if(searchRegex === null){
        parent.append(text);
        return;
    }

    let lastEnd = 0;
    for (const matchText of text.matchAll(searchRegex)){
        if (matchText[0] === ""){
            continue;
        }

        parent.append(text.slice(lastEnd, matchText.index));
        const markTag = document.createElement("mark");
        markTag.textContent = matchText[0];
        parent.append(markTag);

        lastEnd= matchText.index + matchText[0].length;
    }

    parent.append(text.slice(lastEnd));
}