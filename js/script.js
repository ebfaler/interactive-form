
/* ===================
    Name Field
====================== */

const username = document.getElementById('name');
username.focus();

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
            console.log('other is selected')
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
// console.log(colorOptions);
colors.disabled = true;


// color options are displayed based on t-shirt design chosen
designs.addEventListener('change', (e) => {

    colors.disabled = false;

    for (let i = 0; i < colorOptions.length; i++) {

        if (e.target.value == colorOptions[i].getAttribute("data-theme")) {
            colorOptions[i].disabled = false;
        } else {
            colorOptions[i].disabled = true;
        }
    }
});


/* ===================
   Register for Activities Section
====================== */

const activities = document.getElementById('activities');
const displayCost = document.getElementById('activities-cost');
let totalCost = 0;


//enabling the total to display the sum of selected activities

activities.addEventListener('change', (e) => {
    //using the unary plus operator + to convert the string into a number
    const cost = +e.target.getAttribute('data-cost');

    if (e.target.checked === true) {
        totalCost += cost;
    }
    else {
        totalCost -= cost;
        // console.log('unchecked');
    }
    console.log(totalCost);
    displayCost.innerHTML = `Total: ${totalCost}`;
})


/* ===================
 Payment Info Section
====================== */


const payment = document.getElementById('payment');
const credit = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');


//only display the most popular payment method , then display and hide methods based on user selection

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


/* function to validate name input */
const usernameValidator = () => {

    const usernameValue = username.value;
    console.log("Name value is: ", `"${usernameValue}"`);

    //tests that there is at least a first name containing only letters, and allows for a middle and last name.
    const usernameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(usernameValue);
    console.log(`Name validation test on "${usernameValue}" evaluates to ${usernameIsValid}`);
    return usernameIsValid;
};

/* function to validate email input */
const emailValidator = () => {

    const emailValue = email.value;
    console.log("Email value is: ", `"${emailValue}"`);

    //tests that there is at least a first name containing only letters, and allows for a middle and last name.
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    console.log(`Email validation test on "${emailValue}" evaluates to ${emailIsValid}`);
    return emailIsValid;
};


/* function to validate activities input */
const activitiesValidator = () => {

    const activitiesSectionIsValid = totalCost > 0;
    console.log(`Total cost for testing is ${totalCost}`)
    console.log(`Activities section validation test evaluates to ${activitiesSectionIsValid}`);
    return activitiesSectionIsValid;
};



/*submit event listener for entire form*/

form.addEventListener('submit', e => {

    // IMPORTANT NOTE: Firing the submit event will refresh the page and reset the form, erasing your log statements.
    // This can be prevented by calling `e.preventDefault()` here in this submit handler
    if (!usernameValidator()) {
        e.preventDefault();
    }

    if (!emailValidator()) {
        e.preventDefault();
    }

 if (!activitiesValidator()) {
        e.preventDefault();
    }

    // log out a message saying this particular validator prevented submission
    console.log('Submit handler is functional!');


})


