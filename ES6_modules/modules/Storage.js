export function getBook() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}

export function addBook(newBook) {
  const books = getBook();
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
}

export function removeBook(title) {
  const books = getBook();
  const index = books.findIndex((book) => book.title === title);
  if (index !== -1) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}
