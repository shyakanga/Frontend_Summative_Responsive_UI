import {
  titleRegexValidation,
  authorValidationRegex,
  validatePagesRegex,
  tagRegex,
  checkDate,
} from "./validators.js";

function setUpForm(formName) {
  const form = document.getElementById(formName + "-form");
  const formAlertMessage = document.getElementById(formName + "-message");
  const fields = [
    { fieldName: "title", checkField: titleRegexValidation },
    { fieldName: "author", checkField: authorValidationRegex },
    { fieldName: "pages", checkField: validatePagesRegex },
    { fieldName: "tag", checkField: tagRegex },
    { fieldName: "date", checkField: checkDate },
  ];

  function validateFieldInput(field){
    const input = document.getElementById(formName+ "-" + field.fieldName);
    const error = document.getElementById(formName+ "-" + field.fieldName + "-error");
    error.textContent = field.checkField(input.value);
    return error.textContent === "";
  }

  for (const field of fields) {
    document.getElementById(formName + "-" + field.fieldName).addEventListener("input", function () {
      validateFieldInput(field);
    });
  }

  form.addEventListener("submit", function (event){
    event.preventDefault();
    let fieldsValidity = true;
    for (const field of fields) {
      if (!validateFieldInput(field)) {
        fieldsValidity = false;
      }
    }

    if(fieldsValidity){
        formAlertMessage.textContent = "All fields are valid"
    }else{
        formAlertMessage.textContent = "Please fix the errors above"
    }
  });
}

setUpForm("add")
setUpForm("edit")