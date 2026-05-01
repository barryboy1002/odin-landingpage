let library = [];
let submitBookBtn = document.querySelector("#submitBook");
const bookList = document.querySelector('.book-list');
submitBookBtn.addEventListener("click", submitForm);

function Book(id, author, title, year, read) {
  this.id = id;           
  this.author = author;   
  this.title = title;
  this.year = year;
  this.read = read;     
  this.info = () => {
    console.log(`${this.title} by ${this.author}, published in ${this.year}. Read: ${this.read}`);
  };
}

Book.prototype.toggleRead = function(){ 
  this.read =! this.read;
  console.log(this.read);
}

function addBookToLibrary(author, title, year, read, library) {
  const id = crypto.randomUUID();
  const book = new Book(id, author, title, year, read);
  library.push(book);
  return book; 
}

function openForm() {
  const overlay = document.getElementById('popupOverlay');
  overlay.classList.toggle('show');
}

function submitForm(event) {
  event.preventDefault();

  const author = document.querySelector("#author").value;
  const title = document.querySelector("#title").value;
  const year = document.querySelector("#year").value;
  const read = document.querySelector("#read").checked;

  const newBook = addBookToLibrary(author, title, year, read, library);
  displayLibraryItem(bookList, newBook);
}

function displayLibrary(library) {
  for (const book of library) {
    displayLibraryItem(bookList, book);
    console.log(book);
  }
}

function displayLibraryItem(bookList, book) {
  //fix all the book-items properties.
  let bookItem = document.createElement("div");
  // add the contents of the button
  let deletebtn = document.createElement("button");
  deletebtn.setAttribute("class", "delete-item");
  deletebtn.addEventListener("click", deleteBook);
  
  let readStatus = document.createElement("input");
  readStatus.setAttribute("type", "checkbox");
  readStatus.checked = book.read
  readStatus.addEventListener("click", (event)=>{book.toggleRead()});

  bookItem.setAttribute("class", "book-item");
  bookItem.dataset.id = book.id;
  bookItem.innerText = book.title;

  bookItem.append(deletebtn);
  bookItem.append(readStatus);
  bookList.append(bookItem);
}

function deleteBook(event){
  const idToDelete = event.target.parentElement.dataset.id;
  console.log(idToDelete);
  library = library.filter((item)=>{item.id !== idToDelete});
  
  event.target.closest('.book-item').remove();
  console.log("update the library", library);
}

// Initial books
addBookToLibrary("JK", "Harry Potter", 1999, true, library);
addBookToLibrary("Maggie", "Linux Bible", 1999, true, library);
addBookToLibrary("Greg KH", "Linux Drivers", 1999, true, library);
addBookToLibrary("Barrack", "MyLife", 1999, true, library);
displayLibrary(library);