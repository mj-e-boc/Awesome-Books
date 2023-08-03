/* eslint-disable import/prefer-default-export */

import Book from './modules/Book.js';
import { getBook, addBook, removeBook } from './modules/Storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const buttonAdd = document.querySelector('.addbook');
  const bookList = document.querySelector('.books');

  // Function to create a book element
  function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('bookstyle');
    bookElement.innerHTML = `
      <div>
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button class="remove-btn">remove</button>
      </div>
    `;
    return bookElement;
  }

  // Function to render all books
  function renderBooks() {
    const books = getBook();
    bookList.innerHTML = '';
    books.forEach((book) => {
      const bookElement = createBookElement(book);
      bookList.appendChild(bookElement);
    });
  }

  // Populate Books from Local Storage
  renderBooks();

  // Display new Books
  function displayNew() {
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const newBook = new Book(title, author);

    if (title && author) {
      const bookElement = createBookElement(newBook);
      bookList.appendChild(bookElement);
      addBook(newBook);
      document.getElementById('author').value = '';
      document.getElementById('title').value = '';
    } else {
      const errorMsg = document.createElement('p');
      errorMsg.classList.add('error-msg');
      errorMsg.textContent = 'Please enter a valid title and author';
      buttonAdd.insertAdjacentElement('afterend', errorMsg);
      setTimeout(() => {
        errorMsg.remove();
      }, 3000);
    }
  }

  // Event Listeners
  buttonAdd.addEventListener('click', displayNew);

  const listNavItem = document.getElementById('list-item');
  const addNavItem = document.getElementById('add-item');
  const contactNavItem = document.getElementById('contact-item');

  const showBooksSection = document.getElementById('books');
  const addBookSection = document.getElementById('addbook');
  const contactSection = document.getElementById('Information');

  // Display the Books section by default
  showBooksSection.style.display = 'block';

  listNavItem.addEventListener('click', () => {
    showBooksSection.style.display = 'block';
    addBookSection.style.display = 'none';
    contactSection.style.display = 'none';
  });

  addNavItem.addEventListener('click', () => {
    showBooksSection.style.display = 'none';
    addBookSection.style.display = 'block';
    contactSection.style.display = 'none';
  });

  contactNavItem.addEventListener('click', () => {
    showBooksSection.style.display = 'none';
    addBookSection.style.display = 'none';
    contactSection.style.display = 'block';
  });

  bookList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const bookElement = e.target.closest('.bookstyle');
      const titleElement = bookElement.querySelector('p:first-child');
      const title = titleElement.textContent;
      bookElement.remove();
      removeBook(title);
    }
  });
});
