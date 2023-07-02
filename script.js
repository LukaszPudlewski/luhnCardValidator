const form = document.querySelector('.form')
const allowedCharacters = /[a-zA-Z0-9 !#$%&'*+-/=?^_`{|}~]/;
const allowedName = /[a-zA-Z ]/;
const allowedEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

let name = form.elements.namedItem("name");
let email = form.elements.namedItem("email");
let card = form.elements.namedItem("card");

name.addEventListener('input', validate);
email.addEventListener('input', validate);
card.addEventListener('input', validate);

form.addEventListener('submit', function (e) {
    e.preventDefault();

    alert('SUBMITED');
    return true;
});


function validate(e) {
    if (e.target.name === "name") {
      let isValid = true;
      let hasSpace = false;
  
      for (let i = 0; i < e.target.value.length; i++) {
        const character = e.target.value.charAt(i);
        if (!allowedName.test(character)) {
          isValid = false;
          break;
        }
        if (character === ' ') {
          hasSpace = true;
        }
  
        if (i < e.target.value.length - 1 && character === ' ' && e.target.value.charAt(i + 1) === ' ') {
          isValid = false;
          break;
        }
        
        // Check if the input element contains two words.
        if (e.target.value.split(' ').length !== 2) {
            isValid = false;
            break;
        }
      }
  
      // Check if each word contains at least two letters.
      const words = e.target.value.split(' ');
      for (const word of words) {
        if (word.length < 2) {
          isValid = false;
          break;
        }
      }
  
      // Check if each word contains at most 20 letters.
      for (const word of words) {
        if (word.length > 35) {
          isValid = false;
          break;
        }
      }
  
      if (isValid && hasSpace) {
        e.target.classList.add('valid');
        e.target.classList.remove('invalid');
      } else {
        e.target.classList.add('invalid');
        e.target.classList.remove('valid');
      }
    }

    if (e.target.name === "email") {
        let isValid = true;
    
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(e.target.value)) {
          isValid = false;
        }
    
        if (isValid) {
          e.target.classList.add('valid');
          e.target.classList.remove('invalid');
        } else {
          e.target.classList.add('invalid');
          e.target.classList.remove('valid');
        }
      }

}
