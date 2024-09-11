// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const display = document.getElementById('display');
const time = document.getElementById('time');

const Client = require('pg').Client;
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'salma salem 123',
    port: 5432,
});


myForm.addEventListener('submit', onSubmit);

function addToCounter() {
    if (display.value === '') {
        display.value = 0;
    }
    display.value = parseInt(display.value) + 1;
}

function subToCounter() {
    if (display.value === '') {
        display.value = 0;
    }
    display.value = parseInt(display.value) - 1;
}

function clearCounter() {
    display.value = '';
}

function onSubmit(e) {
    e.preventDefault();

    if(nameInput.value === '' || emailInput.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
    } else {
        // update database
        client.connect()
            .then(() => console.log('Connected to Postgres SQL'))
            .then(()=> client.query("insert into public.database values ($1, $2, $3, $4)", [nameInput, emailInput, time, display.value]))
            .then(() => client.query('SELECT * FROM public.database'))
            .then(results => console.table(results.rows))
            .catch(e => console.log(e))
            .finally(() => client.end());

        // Create new list item with user
        const li = document.createElement('li');


        // add the selector for the GMT time zone!!!
        let date = new Date(Date.now());

        // Add text node with input values
        li.appendChild(document.createTextNode(`Time: ${time.value} Name: ${nameInput.value} Email: ${emailInput.value} counter: ${display.value === '' ? 0 : display.value}`));

        // Add HTML
        // li.innerHTML = `<strong>${nameInput.value}</strong>: ${emailInput.value}`;

        // Append to ul
        userList.appendChild(li);

        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
        display.value = '';
    }
}