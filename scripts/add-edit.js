import {
  titleRegexValidation,
  authorValidationRegex,
  validatePagesRegex,
  tagRegex,
  checkDate,
} from "./validators.js";
import { books, addBook, getBookById, removeBook, getNextId, todayDate} from "./state.js";
import { saveBooks } from "./storage.js"


const editIdInput = document.getElementById("edit-id");
const removeButton = document.getElementById("delete-button");

const fields = [
  { fieldName: "title", checkField: titleRegexValidation },
  { fieldName: "author", checkField: authorValidationRegex },
  { fieldName: "pages", checkField: validatePagesRegex },
  { fieldName: "tag", checkField: tagRegex},
  { fieldName: "date", checkField: checkDate }
];

function readField(formName, fieldName){
  return document.getElementById(formName + "-" + fieldName).value;
};

function addFromForm() {
  const book = {
    id: getNextId(),
    title: readField("add", "title"),
    author: readField("add", "author"),
    pages: Number(readField("add", "pages")),
    tag: readField("add", "tag"),
    createdAt: readField("add", "date"),
    updatedAt: todayDate()
  }

  addBook(book);
  return "Book added";
}

function editFromForm() {
  const bookToEdit = getBookById(editIdInput.value);
  if(bookToEdit === null){
    return "book deosn't exist";
  }

  bookToEdit.title = readField("edit", "title");
  bookToEdit.author = readField("edit", "author");
  bookToEdit.pages = Number(readField("edit", "pages"));
  bookToEdit.tag = readField("edit", "tag");
  bookToEdit.createdAt = readField("edit", "date");
  bookToEdit.updatedAt = todayDate();

  saveBooks(books);
  return "book updated";
}

function setUpForm(formName){
  const form = document.getElementById(formName + "-form");
  const formAlertMessage = document.getElementById(formName + "-message");

  function validateFieldInput(field){
    const input = document.getElementById(formName + "-" + field.fieldName);
    const error = document.getElementById(formName + "-" + field.fieldName + "-error");
    error.textContent = field.checkField(input.value);
    return error.textContent === "";
  }

  for (const field of fields){
    document.getElementById(formName + "-" + field.fieldName).addEventListener("input", function (){
      validateFieldInput(field);
    })
  }

  form.addEventListener("submit", function (event){
    event.preventDefault();

    let fieldsValidity = true;
    for (const field of fields) {
      if (!validateFieldInput(field)){
        fieldsValidity = false;
      }
    }

    if (fieldsValidity){
      if(formName == "add"){
        formAlertMessage.textContent = addFromForm();
        form.reset();
      }else{
        formAlertMessage.textContent = editFromForm();
      }
    } else{
      formAlertMessage.textContent = "correct the errors in the input fields";
    }
  })
}

setUpForm("add");
setUpForm("edit")

removeButton.addEventListener("click", function(){
  const bookToDelete = getBookById(editIdInput.value);
  if(bookToDelete === null){
    document.getElementById("edit-message").textContent = "book not found";
    return;
  }

  if (confirm(`You are going to delete ${bookToDelete.title}`)){
    removeBook(bookToDelete.id);
    document.getElementById("edit-form").reset();
    editIdInput.value= "";
    document.getElementById("edit-message").textContent = "delete succesfull";
  };
})