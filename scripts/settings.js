import { books, settings, importBooks } from "./state.js"
import { saveSettings } from "./storage.js"
import { checkSettNum, checkBooks } from "./validators.js"


const pageCapInput = document.getElementById("pages-cap");
const pagesPerHourInput = document.getElementById("pages-per-hour");
const importFileInput = document.getElementById("import-data");
const pagesCapMessage = document.getElementById("pagesCap-message");
const saveBtnMessage = document.getElementById("message");
const pPhMessage = document.getElementById("pPh-message");

const importMessage = document.getElementById("import-message");
const exportMessage = document.getElementById("export-message");

pageCapInput.placeholder = settings.pageCap;
pagesPerHourInput.placeholder = settings.pagesPerHour;


document.getElementById("save").addEventListener("click", function() {
    if (pageCapInput.value === "" && pagesPerHourInput.value === "") {
        saveBtnMessage.textContent = "Enter atleast one setting";
        return;
    }

    if (pageCapInput.value !== ""){
        const error = checkSettNum(pageCapInput.value);
        if(error !== ""){
            pagesCapMessage.textContent = "Page Cap: "+ error;
            return
        }
    }

    if(pagesPerHourInput.value !== ""){
        const error = checkSettNum(pagesPerHourInput.value);
        if(error !== ""){
            pPhMessage.textContent = "Reading speed: " + error;
            return;
        }
    }

    if (pageCapInput.value !== ""){
        settings.pageCap = Number(pageCapInput.value);
    }

    if (pagesPerHourInput.value !== ""){
        settings.pagesPerHour = Number(pagesPerHourInput.value);
    }

    saveSettings(settings);
    pagesCapMessage.textContent = "";
    pPhMessage.textContent = "";
    saveBtnMessage.textContent = "";
    saveBtnMessage.textContent = "Settings saved";
});


document.getElementById("export-data").addEventListener("click", function () {
    const exportFile = new Blob([JSON.stringify(books, null, 2)], {type: "application/json"});
    const downloadLink = document.createElement("a")
    downloadLink.href = URL.createObjectURL(exportFile);
    downloadLink.download = "books.json"
    downloadLink.click();
    exportMessage.textContent = "Book exported";
});

importFileInput.addEventListener("change", function () {
    const fileToUse = importFileInput.files[0];
    if(!fileToUse){
        return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", function() {
        importFileInput.value = "";
        let bookList = null;
        try{
            bookList = JSON.parse(reader.result);
        } catch {
            importMessage.textContent = "Use a valid JSON file";
            return;
        }

        const problem = checkBooks(bookList);
        if(problem !== ""){
            importMessage.textContent = "Import failed "+ problem;
            return;
        }

        importBooks(bookList);
        importMessage.textContent = "Books imported"
    });
    reader.readAsText(fileToUse);
}) 