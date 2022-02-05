
/* Name Field - focus state */

document.getElementById('name').focus();

/* Job Role Section */

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
);

/* T-shirt info Section */

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

/* Register for Activities Section */
const activities = document.getElementById('activities');
// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let totalCost = 0;
const displayCost = document.getElementById('activities-cost');

//enabling the total to display the sum of selected activities

activities.addEventListener('change', (e) => {
    //using the unary plus operator + to convert the string into a number
    const cost = +e.target.getAttribute('data-cost');

        if (e.target.checked === true) {
            totalCost += cost;
        }

        else if (e.target.checked === false) {
            totalCost -= cost;
            // console.log('unchecked');
        }
        console.log(totalCost);
        displayCost.innerHTML = totalCost;
    })

  

