
getBooks(){
    const books;
    if(localStorage.getItem('book') === null){
        books = [];
    }
    else{
books = JSON.parse(localStorage.getItem('books'));
    }
};

displayBooks(){
const books = document.querySelector('.books');

class Books {
  constructor(title, author) {
   title;
   author;
  };
};

books.forEach((book)=>{

    const newBook = document.createElement('div');
newBook.classList.add('newbook');
newBook.innerHTML = `
<p>Title</p>
<p>Author</p>
<button>remove</button>            
`


})
};