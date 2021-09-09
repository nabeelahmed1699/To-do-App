// !Selectors
const input = document.querySelector('#todo-input');
const btn = document.querySelector('#add');
const list = document.querySelector('.todo-list');
const quoteHolder = document.querySelector('.quote');
const authorHolder = document.querySelector('.author');
const clipboardBtn = document.querySelector('.clipboard');
// Social media icons
const facebook = document.querySelector('.facebook')
const pinterest = document.querySelector('.pinterest')
const twitter = document.querySelector('.twitter')
const whatsapp = document.querySelector('.whatsapp')
const linkedin = document.querySelector('.linkedin')
const reload = document.querySelector('.reload-quote')





var todos = JSON.parse(localStorage.getItem('todos'));
if (todos) {

    todos.map(todo => createItem(todo))
} else {
    todos = [];
}

// !Event Listeners
btn.addEventListener('click', createItemUpdateArray);
list.addEventListener('click', checkListen);
reload.addEventListener('click', generateQuote);
clipboardBtn.addEventListener('click', copyQuote);

// !Functions

function addToArray(value) {
    let todo = { value, checked: false }
    todos.push(todo);
    saveLocalStorage(todos);
    return todo;
}

function createItemUpdateArray() {
    let value = input.value;

    let todo = addToArray(value);
    createItem(todo);

    input.value = '';
}

function createItem(todo) {
    const { value, checked } = todo;
    if (value) {
        const li = document.createElement('li');

        li.innerHTML = `
                    <p>${value}</p>
                    <div class="icons">
                        <i class="far fa-trash-alt trash "></i>
                        <i class="far fa-check-square check "></i>
                    </div>`;

        li.classList.add(`todo-item`);
        checked && li.classList.add('done');

        list.appendChild(li);
    }
}

function checkListen(event) {
    const target = event.target;

    // if the target is Check btn
    if (target.classList.contains('check')) {
        checkedItem(target);
    }
    // if the target is trash btn
    if (target.classList.contains('trash')) {
        deletItem(target);
    }
}

function checkedItem(item) {
    // getting the value of the todo that been checked
    let todoValue = item.parentElement.previousElementSibling.innerText;

    // finding the index of the object contain that value
    const index = todos.findIndex((todo) => todo.value == todoValue);


    // checking if the value is already true means it already checked then it made uncheck otherwise check it    
    todos[index].checked = todos[index].checked == true ? false : true;
    saveLocalStorage(todos);

    const parent = item.parentElement.parentElement;
    parent.classList.toggle('done');
}

function deletItem(item) {
    var parent = item.parentElement.parentElement;

    //add Class to item to animate
    parent.classList.add('fall');

    // listen if the item finish transition then remove
    parent.addEventListener('transitionend', () => {

        // getting the value of the todo that been checked
        let todoValue = item.parentElement.previousElementSibling.innerText;

        // finding the index of the object contain that value
        const index = todos.findIndex((todo) => todo.value == todoValue);
        // removing the item from the array
        todos.splice(index, 1);
        // removing the item from the ui
        parent.remove();
        // again saving the data to the local storage
        saveLocalStorage(todos);
    })
}

function saveLocalStorage(arr) {
    localStorage.setItem('todos', JSON.stringify(arr));
}

function generateRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

async function generateQuote() {

    let url = "https://type.fit/api/quotes";

    await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((quotes) => {

            let index1 = generateRandomIndex(quotes.length);


            quoteHolder.innerText = quotes[index1].text;
            authorHolder.innerText = `By : ${quotes[index1].author}`;
        });
};
generateQuote();
(function socialShare() {
    let postText = `'Hey there Check this todo app`

    let url = encodeURI(document.location.href);

    facebook.setAttribute('href', `https://www.facebook.com/sharer.php?u=${url}`);
    whatsapp.setAttribute('href', `https://api.whatsapp.com/send?text=${postText} ${url}`);
    linkedin.setAttribute('href', `https://www.linkedin.com/shareArticle?url=${url}&title=${postText}`);
    twitter.setAttribute('href', `https://twitter.com/share?url=${url}&text=${postText}&via=${'@nabeel_mufti'}&hashtags=[hashtags]`);
    pinterest.setAttribute('href', `https://pinterest.com/pin/create/bookmarklet/?url=${url}&description=${postText}`);
})();


function copyQuote() {
    /* Get the text field */
    var copyText = quoteHolder;

    /* Select the text field */
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.innerText);
    /* Alert the copied text */
    alert("Copied the text: " + copyText.innerText);
}
