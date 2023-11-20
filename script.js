'use strict';

// **Contact Us form**

let contactForm = document.getElementById('contactForm');

function validateForm() {
  let firstName = document.getElementById('fname').value;
  let lastName = document.getElementById('lname').value;
  let email = document.getElementById('email').value;

  const namePattern = /^[a-zA-Z]+$/;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // I got this regex pattern from a tutorial https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript

  // Name validations
  if (
    firstName.length < 3 ||
    firstName.length > 15 ||
    lastName.length < 3 ||
    lastName.length > 15
  ) {
    alert('First and last name must be between 3 - 15 characters.');
    return false;
  }

  if (!firstName.match(namePattern) || !lastName.match(namePattern)) {
    alert('First and last name must only contain alphabet characters.');
    return false;
  }

  if (!email.match(emailPattern)) {
    alert('Please enter a valid email address.');
    return false;
  }

  return true;
}

contactForm.addEventListener('submit', validateForm);

// contactForm.addEventListener('submit', function (e) {
//   if (validateForm()) {
//     e.preventDefault(); //<<<--- I learned that e.preventDefault is basically  preventing the browser from changing after you click submit. The default is to send the form to a server and reload the page. Since I dont have a server, im stopping it from happening.
//     const fullName = `${document.getElementById('fname').value} ${
//       document.getElementById('lname').value
//     }`;
//     const message = `Thank you for reaching out to us: ${fullName}!`;
//     alert(message);
//   }
// });
