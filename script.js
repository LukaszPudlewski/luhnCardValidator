const form = document.querySelector('.form')
const allowedCharacters = /[a-zA-Z0-9 !#$%&'*+-/=?^_`{|}~]/;
const allowedName = /[a-zA-Z ]/;

let name = form.elements.namedItem("name");
let email = form.elements.namedItem("email");
let card = form.elements.namedItem("card");

name.addEventListener('input', validate);
email.addEventListener('input', validate);
card.addEventListener('input', validate);

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameField = form.elements.namedItem("name");
    const emailField = form.elements.namedItem("email");
    const cardField = form.elements.namedItem("card");

    validate({ target: nameField });
    validate({ target: emailField });
    validate({ target: cardField });

    if (nameField.classList.contains('valid') && emailField.classList.contains('valid') && cardField.classList.contains('valid')) {
    
        const validatedData = {
            name: nameField.value,
            email: emailField.value,
            card: cardField.value,
        };

        console.log(validatedData);

        /////////sending email

        sendEmailToMailchimp(validatedData.name, validatedData.email, validatedData.card);

      //  form.reset();
    } else {
        alert('Please fill in all fields correctly.');
    }
});




function validate(e) {
//name
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
        
        if (e.target.value.split(' ').length !== 2) {
            isValid = false;
            break;
        }
      }
  
      const words = e.target.value.split(' ');
      for (const word of words) {
        if (word.length < 2) {
          isValid = false;
          break;
        }
      }
  
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
//email
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
//card
      if (e.target.name === "card") {
        let isValid = true;
      
        const cardNumber = e.target.value;
        const digits = cardNumber.split('');
      
        if (digits.length !== 16) {
          isValid = false;
        }
      
        let checksum = 0;
        for (let i = 0; i < digits.length; i++) {
          let digit = parseInt(digits[i]);
          if (i % 2 === 0) {
            digit = digit * 2;
          }
          if (digit > 9) {
            digit = digit - 9;
          }
          checksum += digit;
        }
      
        if (checksum % 10 !== 0) {
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

async function sendEmailToMailchimp(name, email, card) {
    const apiKey = 'e8971c7ee94633a8ef104f6c518d84a2-us21';
    const listId = '92f89eecc9';
  
    try {
      const response = await fetch(`https://us21.api.mailchimp.com/3.0/lists/${listId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${apiKey}`
        },
        body: JSON.stringify({
          email_address: 'test@dn-uk.com',
          status: 'subscribed',
          merge_fields: {
            NAME: name,
            EMAIL: email,
            CARD: card
          }
        })
      });
  
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
