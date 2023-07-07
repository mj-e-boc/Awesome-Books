/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const buttonAdd = document.querySelector('.addbook');
const bookList = document.querySelector('.books');

// Storage functions

class Storage {
  static getBook() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(newBook) {
    const books = Storage.getBook();
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Storage.getBook();
    const index = books.findIndex((book) => book.title === title);
    if (index !== -1) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
}

// Populate Books from Local Storage

const books = Storage.getBook();
books.forEach((book) => bookList.insertAdjacentHTML(
  'afterbegin',
  `<div class='bookstyle'><div><span>${book.title}</span> <span>by</span> <span>${book.author}</span></div> <button class="remove-btn">Remove</button></div>`,
));

// Display new Books
class UI {
  static displayNew() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const newBook = new Book(title, author);

    if (title && author) {
      bookList.insertAdjacentHTML(
        'afterbegin',
        `<div class='bookstyle'><div><span>${newBook.title}</span> <span>by</span> <span>${newBook.author}</span></div> <button class="remove-btn">Remove</button></div>`,
      );
      Storage.addBook(newBook);
      document.getElementById('author').value = '';
      document.getElementById('title').value = '';
    } else {
      buttonAdd.insertAdjacentHTML(
        'afterend',
        '<p class="error-msg">Please enter a valid title and author<p>',
      );
      setTimeout(() => {
        const errorMsg = document.querySelector('.error-msg');
        errorMsg.remove();
      }, 3000);
    }
  }
}

// Event Listeners

buttonAdd.addEventListener('click', UI.displayNew);

document.addEventListener('click', (e) => {
  const target = e.target.closest('.remove-btn');
  const title = target.previousElementSibling.firstChild.textContent;

  if (target) {
    target.parentElement.remove();
  }

  Storage.removeBook(title);
});
/* eslint-disable max-classes-per-file */

// single page app

const contactLink = document.querySelector('#contact-item');
const addLink = document.querySelector('#add-item');
const listLink = document.querySelector('#list-item');
const contactInformation = document.querySelector('.Info');
const listOfBooks = document.querySelector('.showBooks');
const addBook = document.querySelector('.add-Book');

function hideItem(element) {
  element.style.display = 'none';
}
function showItem(element) {
  element.style.display = 'block';
}

contactLink.addEventListener('click', () => {
  showItem(contactInformation);
  hideItem(addBook);
  hideItem(listOfBooks);
});

listLink.addEventListener('click', () => {
  showItem(listOfBooks);
  hideItem(contactInformation);
  hideItem(addBook);
});

addLink.addEventListener('click', () => {
  showItem(addBook);
  hideItem(contactInformation);
  hideItem(listOfBooks);
});

// time element
const datetime = document.querySelector('.date');
setInterval(() => {
  const date = new Date();
  datetime.innerHTML = `${date.toDateString()}, ${date.toLocaleTimeString()}`;
}, 1000);