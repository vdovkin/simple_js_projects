const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const birthday = document.getElementById("birthday");
const gender = document.querySelector('input[name="gender"]:checked');
const phonenumber = document.getElementById("phonenumber");
const profession = document.getElementById("profession");

const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");
const message3 = document.getElementById("message3");
const message4 = document.getElementById("message4");
const message5 = document.getElementById("message5");
const message6 = document.getElementById("message6");

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
}

// Check reuierd fields
function checkRequired(inputArr) {
  var status = false;
  for (input of inputArr) {
    if (input.value.trim() == "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
      status = true;
    }
  }
  return status;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Check Profession //
function checkProfession(input) {
  var profession_selected = profession.options[profession.selectedIndex];
  if (profession_selected.value == 0) {
    showError(input, "You need to choose one option");
    return false;
  } else {
    showSuccess(input);
    return profession_selected.text;
  }
}

function checkPhone(input) {
  var phoneRe = /^\d{10}$/;
  var digits = input.value.replace(/\D/g, "");
  if (!phoneRe.test(digits)) {
    showError(input, "Your phone number is invalid");
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// make success alert
function successSubmit(profession) {
  message1.innerText = `Thank you ${firstname.value} ${lastname.value} for registration!`;
  message2.innerText = `Your profession is ${profession}`;
  message3.innerText = `Your email is ${email.value}`;
  message4.innerText = `Your phone is ${phonenumber.value} `;
  message5.innerText = `Your birthday is ${birthday.value}`;
  message6.innerText = `Your gender is ${gender.value} `;
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (checkRequired([firstname, lastname, email, phonenumber, birthday])) {
    var check1 = checkEmail(email);
    var check2 = checkLength(firstname, 3, 15);
    var check3 = checkLength(lastname, 3, 25);
    var check_profession = checkProfession(profession);
    var check4 = checkPhone(phonenumber);
  }

  if (check1 && check2 && check3 && check4 && check_profession) {
    successSubmit(check_profession);
  }
});
