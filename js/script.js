
/* ===================
    Name Field
====================== */

const username = document.getElementById('name');
username.focus();
const nameHintTwo = document.getElementById('name-hint2');

//exceeds requirement: programmed the name field to run a real time validation check 
username.addEventListener('keyup', (e) => {
    if (!usernameValidator()) {
        nameHint.style.display = "block";
    }
    else {
        nameHint.style.display = "none";
    }
})

/* ===================
   Job Role Section
====================== */

//other box is not available on load
const otherBox = document.getElementById('other-job-role');
otherBox.style.display = 'none';

const jobSelect = document.getElementById('title');

//when other is selected, the other box is displayed for the user to enter details
jobSelect.addEventListener('change',
    function (e) {
        if (e.target.value === 'other') {
            otherBox.style.display = 'block';
        }
        else {
            otherBox.style.display = 'none';
        }
    }
)
/* ===================
  T-shirt info Section
====================== */

//color options are not available on load
const designs = document.getElementById('design');
const colors = document.getElementById('color');

const colorOptions = colors.children;
colors.disabled = true;


// color options are displayed based on t-shirt design chosen
designs.addEventListener('change', (e) => {

    colors.disabled = false;

    for (let i = 0; i < colorOptions.length; i++) {

        if (e.target.value == colorOptions[i].getAttribute("data-theme")) {
            colorOptions[i].hidden = false;
            colorOptions[i].selected = true;
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].selected = false;
        }
    }
});


/* ===================
   Register for Activities Section
====================== */

const activities = document.getElementById('activities');
const displayCost = document.getElementById('activities-cost');
let totalCost = 0;


//* Enabling the total to display the sum of selected activities  //

activities.addEventListener('change', (e) => {
    //using the unary plus operator + to convert the string into a number
    const cost = +e.target.getAttribute('data-cost');
    if (e.target.checked === true) {
        totalCost += cost;
    }
    else {
        totalCost -= cost;
    }
    displayCost.innerHTML = `Total: ${totalCost}`;
})




//* Making the focus states of the activities more accessible *//
const checkboxes = document.querySelectorAll('input[type=checkbox]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('focus', (e) => {
        e.target.parentNode.classList.add('focus');
    })

    checkbox.addEventListener('blur', (e) => {
        e.target.parentNode.classList.remove('focus');
    })

})

//  * Event listener for checkboxes *//
//exceeds requirement: run loop over all of the activities, check if any have the same day and time as the activity that 
//was just checked/unchecked

activities.addEventListener('change', e => {
    const clicked = e.target;
    const clickedType = e.target.getAttribute('data-day-and-time');

    checkboxes.forEach(checkbox => {
        const checkboxType = checkbox.getAttribute('data-day-and-time');
        if (checkboxType === clickedType && clicked !== checkbox) {
            if (clicked.checked) {
                checkbox.disabled = "true";
            }
            else {
                checkbox.disabled = "false";
            }
        }

    })
});


/* ===================
 Payment Info Section
====================== */


const payment = document.getElementById('payment');
const credit = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');


//* Only display the most popular payment method , then display and hide methods based on user selection *//

paypal.style.display = 'none';
bitcoin.style.display = 'none';

payment.children[1].setAttribute('selected', 'selected');

payment.addEventListener('change', (e) => {
    if (e.target.value === 'paypal') {
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
        credit.style.display = 'none';
    }
    else if (e.target.value === 'bitcoin') {
        bitcoin.style.display = 'block';
        paypal.style.display = 'none';
        credit.style.display = 'none';
    }
    else if (e.target.value === 'credit-card') {
        credit.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    }
})

/* ===================
 Form Validation using Regex
====================== */

//Form submission should be prevented if one or more of the required fields 
//or sections is not filled out correctly

const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');


//* Function to validate name input *//
const usernameValidator = () => {

    const usernameValue = username.value;

    //tests that there is at least a first name containing only letters, and allows for a middle and last name.
    const usernameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(usernameValue);
    return usernameIsValid;
};

//* Function to validate email input *//
const emailValidator = () => {

    const emailValue = email.value;
    //tests that there is a valid email
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
};


//* Function to validate activities input *//
const activitiesValidator = () => {

    const activitiesSectionIsValid = totalCost > 0;
    return activitiesSectionIsValid;
};


//* Function to validate card number *//
//The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces


const cardNumberValidator = () => {

    const cardNumberValue = cardNumber.value;
    const cardNumberIsValid = /^[0-9]{13,16}$/.test(cardNumberValue);
    return cardNumberIsValid;

}

//* Function to validate zip code *//
//The "Zip code" field must contain a 5 digit number.

const zipValidator = () => {

    const zipValue = zip.value;
    const zipIsValid = /^[0-9]{5}$/.test(zipValue);
    return zipIsValid;

}

//* Function to validate cvv code *//
//The "Zip code" field must contain a 3 digit number.

const cvvValidator = () => {

    const cvvValue = cvv.value;
    const cvvIsValid = /^[0-9]{3}$/.test(cvvValue);
    return cvvIsValid;

}

//* Submit event listener for entire form *//

const nameHint = document.getElementById('name-hint');
const emailHint = document.getElementById('email-hint');
const activitiesHint = document.getElementById('activities-hint');
let ccHint = document.getElementById('cc-hint');
const zipHint = document.getElementById('zip-hint');
const cvvHint = document.getElementById('cvv-hint');

form.addEventListener('submit', e => {
    //hide hints and set everything to valid, remove not-valid

    const hints = document.querySelectorAll('.hint');
    hints.forEach(hint => {
        hint.style.display = "none";
    });
    
    activities.classList.add('valid');
    activities.classList.remove('not-valid');

    function setValid(section) {
        console.log(section.parentElement);
        section.parentElement.classList.add('valid');
        section.parentElement.classList.remove('not-valid');
        
    }

    setValid(username);
    setValid(email);
    setValid(cardNumber);
    setValid(zip);
    setValid(cvv);

    // IMPORTANT NOTE: Firing the submit event will refresh the page and reset the form, erasing the log statements.
    // This can be prevented by calling `e.preventDefault()` here in this submit handler
    if (!usernameValidator()) {
        e.preventDefault();
        nameHint.style.display = 'block';
        //add invalid class to label and remove  valid, show hint
        username.parentElement.classList.add('not-valid');
        username.parentElement.classList.remove('valid');

    }
    if (!emailValidator()) {
        e.preventDefault();
        emailHint.style.display = 'block';
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');
    }
    if (!activitiesValidator()) {
        e.preventDefault();
        activitiesHint.style.display = 'block';
        activities.classList.add('not-valid');
        activities.classList.remove('valid');
    }
    if (payment.value == 'credit-card' && !cardNumberValidator()) {
        e.preventDefault();
        ccHint.style.display = 'block';
        cardNumber.parentElement.classList.add('not-valid');
        cardNumber.parentElement.classList.remove('valid');
        const cardNumberValue = cardNumber.value;
        //exceeds requirement: display a specific message based on length of card number input
        if (cardNumberValue.length < 13) {
            ccHint.innerHTML = 'You have entered too few numbers. Please choose between 13 - 16 digits'
        }
        else if (cardNumberValue > 16) {
            ccHint.innerHTML = 'You have entered too many numbers. Please choose between 13 - 16 digits'
        }
    }
    if (payment.value == 'credit-card' && !zipValidator()) {
        e.preventDefault();
        zipHint.style.display = 'block';
        zip.parentElement.classList.add('not-valid');
        zip.parentElement.classList.remove('valid');
    }
    if (payment.value == 'credit-card' && !cvvValidator()) {
        e.preventDefault();
        cvvHint.style.display = 'block';
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.classList.remove('valid');
    }
   
})


